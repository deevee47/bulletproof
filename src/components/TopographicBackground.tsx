"use client"
import React, { useEffect, useRef, useState } from 'react';

const TopographicBackground: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const timeRef = useRef(0);
    const animationFrameIdRef = useRef<number>();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (svgRef.current) {
            const svg = svgRef.current;
            let width = window.innerWidth;
            let height = window.innerHeight;
            let shapes: SVGPathElement[] = [];

            const generateSlimeShape = (radius: number, variation: number, time: number) => {
                const points = 500;
                let path = '';

                for (let i = 0; i <= points; i++) {
                    const angle = (i * 2 * Math.PI) / points;
                    let x = width / 2 + radius * Math.cos(angle);
                    let y = height / 2 + radius * Math.sin(angle);

                    const variationFactor = variation * (
                        Math.sin(angle * 2 + time) * 0.5 +
                        Math.sin(angle * 3 + time * 1.5) * 0.3 +
                        Math.sin(angle * 5 + time * 0.7) * 0.2 +
                        Math.sin(angle * 7 + time * 1.2) * 0.1 +
                        Math.sin(angle * 11 + time * 0.9) * 0.05 +
                        Math.sin(angle * 13 + time * 1.1) * 0.025
                    );

                    x += radius * variationFactor * Math.cos(angle + time * 0.2);
                    y += radius * variationFactor * Math.sin(angle + time * 0.2);

                    path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
                }

                path += 'Z';
                return path;
            };

            const createSingleGroupSlimeShapes = () => {
                const maxRadius = Math.max(width, height) * 0.8; // Increased to cover more of the page
                const shapesCount = 80; // Increased number of shapes

                svg.innerHTML = '';
                shapes = [];

                for (let i = 0; i < shapesCount; i++) {
                    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const radius = maxRadius * (i + 1) / shapesCount;
                    const variation = 0.5 - (i * 0.005); // Reduced variation for smoother curves

                    shape.setAttribute('d', generateSlimeShape(radius, variation, 0));
                    shape.setAttribute('fill', 'none');
                    shape.setAttribute('stroke', 'white');
                    shape.setAttribute('stroke-width', '0.5');
                    shape.setAttribute('opacity', '0.2');
                    svg.appendChild(shape);
                    shapes.push(shape);
                }
            };

            const updateShapes = (time: number) => {
                const maxForce = 150; // Increased force for more noticeable effect
                const forceRadius = 300; // Increased radius of effect
                const { x: mouseX, y: mouseY } = mousePosition;

                shapes.forEach((shape, index) => {
                    const radius = Math.max(width, height) * 0.8 * (index + 1) / shapes.length;
                    const variation = 0.5 - (index * 0.005);
                    const originalPath = generateSlimeShape(radius, variation, time);
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
                timeRef.current += 0.001; // Slowed down the circular motion even more
                updateShapes(timeRef.current);
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
        <>
            <svg
                ref={svgRef}
                className="fixed inset-0 w-full h-full"
                style={{ background: 'black' }}
            />
        </>
    );
};

export default TopographicBackground;