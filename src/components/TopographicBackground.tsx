"use client";
import React, { useEffect, useRef, useCallback, useMemo } from 'react';

const TopographicBackground: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const animationRef = useRef<{
        time: number;
        pulsate: number;
        circularMotion: number;
        rotation: number;
    }>({ time: 0, pulsate: 0, circularMotion: 0, rotation: 0 });
    const shapesRef = useRef<SVGPathElement[]>([]);
    const dimensionsRef = useRef({ width: 0, height: 0 });

    // Optimize shape generation with memoization
    const generateSlimeShape = useMemo(() => (
        radius: number,
        variation: number,
        time: number,
        pulsate: number,
        circularTime: number,
        rotationAngle: number,
        index: number,
        width: number,
        height: number,
        shapesLength: number
    ) => {
        const points = 500;
        const pulsateEffect = Math.sin(pulsate) * 0.04;
        const adjustedRadius = radius * (1 + pulsateEffect);

        const circularAmplitude = 20;
        const layerOffset = index * 0.1;
        const circularMotion = {
            x: Math.cos(circularTime + layerOffset) * circularAmplitude,
            y: Math.sin(circularTime + layerOffset) * circularAmplitude
        };

        const secondaryAmplitude = 8;
        const secondaryFrequency = 0.5;
        const secondaryMotion = {
            x: Math.cos(circularTime * secondaryFrequency) * secondaryAmplitude,
            y: Math.sin(circularTime * secondaryFrequency) * secondaryAmplitude
        };

        const centerX = width / 2 + circularMotion.x + secondaryMotion.x;
        const centerY = height / 2 + circularMotion.y + secondaryMotion.y;

        const layerRotationSpeed = 1 - (index / shapesLength) * 0.8;
        let path = '';

        for (let i = 0; i <= points; i++) {
            const angle = (i * 2 * Math.PI) / points;
            let x = adjustedRadius * Math.cos(angle);
            let y = adjustedRadius * Math.sin(angle);

            const rotatedX = x * Math.cos(rotationAngle * layerRotationSpeed) - y * Math.sin(rotationAngle * layerRotationSpeed);
            const rotatedY = x * Math.sin(rotationAngle * layerRotationSpeed) + y * Math.cos(rotationAngle * layerRotationSpeed);

            const variationFactor = variation * (
                Math.sin(angle * 2 + time) * 0.5 +
                Math.sin(angle * 3 + time * 1.5) * 0.3 +
                Math.sin(angle * 5 + time * 0.7) * 0.2
            );

            x = centerX + rotatedX + rotatedX * variationFactor * Math.cos(angle + time * 0.2);
            y = centerY + rotatedY + rotatedY * variationFactor * Math.sin(angle + time * 0.2);

            path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
        }

        return `${path}Z`;
    }, []);

    const updateDimensions = useCallback(() => {
        if (!svgRef.current) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        dimensionsRef.current = { width, height };

        svgRef.current.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }, []);

    const createOrUpdateShapes = useCallback(() => {
        if (!svgRef.current) return;

        const { width, height } = dimensionsRef.current;
        const maxRadius = Math.max(width, height) * 0.6;
        const shapesCount = 80;

        if (shapesRef.current.length === 0) {
            for (let i = 0; i < shapesCount; i++) {
                const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const radius = maxRadius * (i + 1) / shapesCount;
                const variation = 0.5 - (i * 0.005);

                shape.setAttribute('d', generateSlimeShape(radius, variation, 0, 0, 0, 0, i, width, height, shapesCount));
                shape.setAttribute('fill', 'none');
                shape.setAttribute('stroke', 'white');
                shape.setAttribute('stroke-width', '0.5');
                shape.setAttribute('opacity', '0.2');
                svgRef.current.appendChild(shape);
                shapesRef.current.push(shape);
            }
        }
    }, [generateSlimeShape]);

    const animate = useCallback(() => {
        const { width, height } = dimensionsRef.current;
        const { current: anim } = animationRef;

        anim.time += 0.001;
        anim.pulsate += 0.02;
        anim.circularMotion += 0.002;
        anim.rotation += 0.002;

        shapesRef.current.forEach((shape, index) => {
            const radius = Math.max(width, height) * 0.8 * (index + 1) / shapesRef.current.length;
            const variation = 0.5 - (index * 0.004);
            shape.setAttribute('d', generateSlimeShape(
                radius, variation, anim.time, anim.pulsate,
                anim.circularMotion, anim.rotation, index,
                width, height, shapesRef.current.length
            ));
        });

        requestAnimationFrame(animate);
    }, [generateSlimeShape]);

    useEffect(() => {
        updateDimensions();
        createOrUpdateShapes();
        const animationFrame = requestAnimationFrame(animate);

        window.addEventListener('resize', updateDimensions);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', updateDimensions);
        };
    }, [updateDimensions, createOrUpdateShapes, animate]);

    return (
        <svg
            ref={svgRef}
            className="fixed inset-0 w-full h-full"
            style={{
                background: 'black',
                willChange: 'transform',
                transform: 'translateZ(0)'
            }}
        />
    );
};

export default TopographicBackground;