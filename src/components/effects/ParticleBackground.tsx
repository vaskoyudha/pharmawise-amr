"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Create particles
        const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let mouseInfluence = false;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            mouseInfluence = true;
        };

        const handleMouseLeave = () => {
            mouseInfluence = false;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // Mouse attraction
                if (mouseInfluence) {
                    const dx = mouseX - particle.x;
                    const dy = mouseY - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const force = (150 - distance) / 150;
                        particle.vx += (dx / distance) * force * 0.05;
                        particle.vy += (dy / distance) * force * 0.05;
                    }
                }

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Damping for mouse attraction
                particle.vx *= 0.98;
                particle.vy *= 0.98;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.vx *= -1;
                    particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.vy *= -1;
                    particle.y = Math.max(0, Math.min(canvas.height, particle.y));
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(94, 252, 232, ${particle.opacity})`;
                ctx.fill();

                // Draw connections
                particles.forEach((other) => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        const opacity = (1 - distance / 120) * 0.15;
                        ctx.strokeStyle = `rgba(63, 180, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="particle-canvas"
            style={{ opacity: 0.4 }}
        />
    );
}
