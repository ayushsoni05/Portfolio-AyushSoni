import { useEffect, useRef } from 'react';

export default function RayBeams({
  beamWidth = 2,
  beamHeight = 40,
  beamNumber = 50,
  lightColor = '#ffffff',
  backgroundColor = '#111113',
  speed = 2,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;
    const numStrips = 35;
    const numSegments = 60;

    const render = () => {
      time += 0.015 * speed;

      // Dark background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const stripSpacing = width / (numStrips - 1);
      const segmentHeight = height / (numSegments - 1);

      // Light direction vector (from top right towards viewer)
      const lx = 0.3, ly = 0.5, lz = 0.8;
      const lLen = Math.hypot(lx, ly, lz);
      const nLx = lx / lLen, nLy = ly / lLen, nLz = lz / lLen;

      ctx.lineWidth = 1;

      // Render 3D noise-deformed metallic ribbon mesh
      for (let i = 0; i < numStrips - 1; i++) {
        const x1 = i * stripSpacing;
        const x2 = (i + 1) * stripSpacing;

        for (let j = 0; j < numSegments - 1; j++) {
          const y1 = j * segmentHeight;
          const y2 = (j + 1) * segmentHeight;

          // 3D Perlin-like wave height z for vertices
          const z1 = Math.sin(y1 * 0.03 + x1 * 0.015 + time * 1.8) * 12 + Math.cos(y1 * 0.06 - time) * 6;
          const z2 = Math.sin(y1 * 0.03 + x2 * 0.015 + time * 1.8) * 12 + Math.cos(y1 * 0.06 - time) * 6;
          const z3 = Math.sin(y2 * 0.03 + x1 * 0.015 + time * 1.8) * 12 + Math.cos(y2 * 0.06 - time) * 6;

          // Calculate surface normal vector (nx, ny, nz)
          const dzdx = (z2 - z1) / stripSpacing;
          const dzdy = (z3 - z1) / segmentHeight;

          // Normal = (-dzdx, -dzdy, 1) normalized
          const nLen = Math.hypot(-dzdx, -dzdy, 1);
          const nx = -dzdx / nLen;
          const ny = -dzdy / nLen;
          const nz = 1 / nLen;

          // Diffuse lighting
          const dot = Math.max(0, nx * nLx + ny * nLy + nz * nLz);
          // Specular highlight
          const spec = Math.pow(Math.max(0, nz * nLz + ny * nLy), 12);

          const baseLum = 18;
          const lum = Math.min(90, baseLum + dot * 35 + spec * 45);

          ctx.fillStyle = `hsl(240, 6%, ${lum}%)`;
          ctx.beginPath();
          ctx.rect(x1, y1, stripSpacing + 0.5, segmentHeight + 0.5);
          ctx.fill();
        }
      }

      // Subtle metallic horizontal stripe overlays matching screenshot
      if (width > 0 && height > 0) {
        const bandH = height / 5;
        for (let b = 0; b < 5; b++) {
          if (b % 2 === 0) {
            const yTop = b * bandH;
            const grad = ctx.createLinearGradient(0, yTop, width, yTop);
            const shineRatio = (Math.sin(time + b) + 1) / 2;
            const stopPos = Math.max(0.001, Math.min(0.999, isNaN(shineRatio) ? 0.5 : shineRatio));

            grad.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
            grad.addColorStop(stopPos, 'rgba(255, 255, 255, 0.12)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0.02)');

            ctx.fillStyle = grad;
            ctx.fillRect(0, yTop, width, bandH);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [backgroundColor, lightColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ background: backgroundColor }}
    />
  );
}
