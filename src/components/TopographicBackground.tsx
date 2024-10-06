"use client"
import React, { useEffect, useRef, useState } from 'react';

const TopographicBackground: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const timeRef = useRef(0);
    const pulsateRef = useRef(0);
    const circularMotionRef = useRef(0);
    const rotationRef = useRef(0);
    const animationFrameIdRef = useRef<number>();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (svgRef.current) {
            const svg = svgRef.current;
            let width = window.innerWidth;
            let height = window.innerHeight;
            let shapes: SVGPathElement[] = [];

            const generateSlimeShape = (
                radius: number,
                variation: number,
                time: number,
                pulsate: number,
                circularTime: number,
                rotationAngle: number,
                index: number
            ) => {
                const points = 500;
                let path = '';

                // Calculate pulsating effect
                const pulsateEffect = Math.sin(pulsate) * 0.05;
                const adjustedRadius = radius * (1 + pulsateEffect);

                // Enhanced circular motion
                const circularAmplitude = 20;
                const layerOffset = index * 0.1;
                const circularMotion = {
                    x: Math.cos(circularTime + layerOffset) * circularAmplitude,
                    y: Math.sin(circularTime + layerOffset) * circularAmplitude
                };

                // Secondary circular motion
                const secondaryAmplitude = 10;
                const secondaryFrequency = 0.7;
                const secondaryMotion = {
                    x: Math.cos(circularTime * secondaryFrequency) * secondaryAmplitude,
                    y: Math.sin(circularTime * secondaryFrequency) * secondaryAmplitude
                };

                // Center point for rotation
                const centerX = width / 2 + circularMotion.x + secondaryMotion.x;
                const centerY = height / 2 + circularMotion.y + secondaryMotion.y;

                // Layer-specific rotation speed
                const layerRotationSpeed = 1 - (index / shapes.length) * 0.8; // Outer layers rotate slower

                for (let i = 0; i <= points; i++) {
                    const angle = (i * 2 * Math.PI) / points;

                    // Calculate point before rotation
                    let x = adjustedRadius * Math.cos(angle);
                    let y = adjustedRadius * Math.sin(angle);

                    // Apply rotation
                    const rotatedX = x * Math.cos(rotationAngle * layerRotationSpeed) -
                        y * Math.sin(rotationAngle * layerRotationSpeed);
                    const rotatedY = x * Math.sin(rotationAngle * layerRotationSpeed) +
                        y * Math.cos(rotationAngle * layerRotationSpeed);

                    // Apply variation after rotation
                    const variationFactor = variation * (
                        Math.sin(angle * 2 + time) * 0.5 +
                        Math.sin(angle * 3 + time * 1.5) * 0.3 +
                        Math.sin(angle * 5 + time * 0.7) * 0.2 +
                        Math.sin(angle * 7 + time * 1.2) * 0.1 +
                        Math.sin(angle * 11 + time * 0.9) * 0.05 +
                        Math.sin(angle * 13 + time * 1.1) * 0.025
                    );

                    // Apply variation and add to center point
                    x = centerX + rotatedX + rotatedX * variationFactor * Math.cos(angle + time * 0.2);
                    y = centerY + rotatedY + rotatedY * variationFactor * Math.sin(angle + time * 0.2);

                    path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
                }

                path += 'Z';
                return path;
            };

            const createSingleGroupSlimeShapes = () => {
                const maxRadius = Math.max(width, height) * 0.8;
                const shapesCount = 80;

                svg.innerHTML = '';
                shapes = [];

                for (let i = 0; i < shapesCount; i++) {
                    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const radius = maxRadius * (i + 1) / shapesCount;
                    const variation = 0.5 - (i * 0.005);

                    shape.setAttribute('d', generateSlimeShape(radius, variation, 0, 0, 0, 0, i));
                    shape.setAttribute('fill', 'none');
                    shape.setAttribute('stroke', 'white');
                    shape.setAttribute('stroke-width', '0.5');
                    shape.setAttribute('opacity', '0.2');
                    svg.appendChild(shape);
                    shapes.push(shape);
                }
            };

            const updateShapes = (
                time: number,
                pulsate: number,
                circularTime: number,
                rotationAngle: number
            ) => {
                const maxForce = 150;
                const forceRadius = 300;
                const { x: mouseX, y: mouseY } = mousePosition;

                shapes.forEach((shape, index) => {
                    const radius = Math.max(width, height) * 0.8 * (index + 1) / shapes.length;
                    const variation = 0.5 - (index * 0.004);
                    const originalPath = generateSlimeShape(
                        radius,
                        variation,
                        time,
                        pulsate,
                        circularTime,
                        rotationAngle,
                        index
                    );
                    const points = originalPath.split(' ').filter(p => p !== 'M' && p !== 'L' && p !== 'Z');

                    const newPath = points.map(point => {
                        const [x, y] = point.split(',').map(Number);
                        const dx = x - mouseX;
                        const dy = y - mouseY;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < forceRadius) {
                            const force = (1 - distance / forceRadius) * maxForce;
                            const angle = Math.atan2(dy, dx);
                            return `${x + Math.cos(angle) * force},${y + Math.sin(angle) * force}`;
                        }
                        return point;
                    });

                    shape.setAttribute('d', `M ${newPath.join(' ')} Z`);
                });
            };

            const handleMouseMove = (event: MouseEvent) => {
                setMousePosition({ x: event.clientX, y: event.clientY });
            };

            const updateSize = () => {
                width = window.innerWidth;
                height = window.innerHeight;
                svg.setAttribute('width', width.toString());
                svg.setAttribute('height', height.toString());
                createSingleGroupSlimeShapes();
            };

            const animate = () => {
                timeRef.current += 0.001;
                pulsateRef.current += 0.02;
                circularMotionRef.current += 0.005;
                rotationRef.current += 0.005; // Slow rotation speed
                updateShapes(
                    timeRef.current,
                    pulsateRef.current,
                    circularMotionRef.current,
                    rotationRef.current
                );
                animationFrameIdRef.current = requestAnimationFrame(animate);
            };

            window.addEventListener('resize', updateSize);
            window.addEventListener('mousemove', handleMouseMove);
            updateSize();
            animate();

            return () => {
                window.removeEventListener('resize', updateSize);
                window.removeEventListener('mousemove', handleMouseMove);
                if (animationFrameIdRef.current) {
                    cancelAnimationFrame(animationFrameIdRef.current);
                }
            };
        }
    }, [mousePosition]);

    return (
        <svg
            ref={svgRef}
            className="fixed inset-0 w-full h-full"
            style={{ background: 'black' }}
        />
    );
};

export default TopographicBackground;