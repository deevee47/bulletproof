"use client";
import React, { useEffect, useRef, useCallback } from 'react';

const TopographicBackground: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const timeRef = useRef(0);
    const pulsateRef = useRef(0);
    const circularMotionRef = useRef(0);
    const rotationRef = useRef(0);
    const animationFrameIdRef = useRef<number>();

    // Throttled mouse move handler using requestAnimationFrame (no event needed)
    const handleMouseMove = useCallback(() => {
        if (!animationFrameIdRef.current) {
            animationFrameIdRef.current = requestAnimationFrame(() => {
                animationFrameIdRef.current = undefined;
            });
        }
    }, []);

    // Memoized generateSlimeShape function
    const generateSlimeShape = useCallback((
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

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = svgRef.current;
        let width = window.innerWidth;
        let height = window.innerHeight;
        const shapes: SVGPathElement[] = [];

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            svg.setAttribute('width', width.toString());
            svg.setAttribute('height', height.toString());
            createOrUpdateShapes(); // Recreate shapes on resize
        };

        // Create initial set of shapes
        const createOrUpdateShapes = () => {
            const maxRadius = Math.max(width, height) * 0.6;
            const shapesCount = 80;

            if (shapes.length === 0) {
                for (let i = 0; i < shapesCount; i++) {
                    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const radius = maxRadius * (i + 1) / shapesCount;
                    const variation = 0.5 - (i * 0.005);

                    shape.setAttribute('d', generateSlimeShape(radius, variation, 0, 0, 0, 0, i, width, height, shapesCount));
                    shape.setAttribute('fill', 'none');
                    shape.setAttribute('stroke', 'white');
                    shape.setAttribute('stroke-width', '0.5');
                    shape.setAttribute('opacity', '0.2');
                    svg.appendChild(shape);
                    shapes.push(shape);
                }
            }
        };

        const updateShapes = (time: number, pulsate: number, circularTime: number, rotationAngle: number) => {
            shapes.forEach((shape, index) => {
                const radius = Math.max(width, height) * 0.8 * (index + 1) / shapes.length;
                const variation = 0.5 - (index * 0.004);
                shape.setAttribute('d', generateSlimeShape(radius, variation, time, pulsate, circularTime, rotationAngle, index, width, height, shapes.length));
            });
        };

        const animate = () => {
            timeRef.current += 0.001;
            pulsateRef.current += 0.02;
            circularMotionRef.current += 0.002;
            rotationRef.current += 0.002
            updateShapes(timeRef.current, pulsateRef.current, circularMotionRef.current, rotationRef.current);
            requestAnimationFrame(animate);
        };

        handleResize();
        createOrUpdateShapes();
        animate();

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [handleMouseMove, generateSlimeShape]);

    return <svg ref={svgRef} className="fixed inset-0 w-full h-full" style={{ background: 'black' }} />;
};

export default TopographicBackground;
