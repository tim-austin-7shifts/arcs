import { CSSProperties, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

type Zoom = "big" | "small";

interface ArcsCSSProperties extends CSSProperties {
  "--size": `var(--${Zoom})`;
}

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${arcSweep} 0 ${end.x} ${end.y}`;
};

const percentageToAngle = (p: number): number => 360 * p;

function App() {
  const [zoom, setZoom] = useState<Zoom>("big");

  const complete = percentageToAngle(0.6);
  const partial = percentageToAngle(0.1);
  const incomplete = percentageToAngle(0.3);

  return (
    <main
      className="content"
      onClick={() => setZoom((zoom) => (zoom === "big" ? "small" : "big"))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="graph"
        style={{ "--size": `var(--${zoom})` } as ArcsCSSProperties}
        viewBox="0 0 100 100"
      >
        <path
          className="arc incomplete"
          d={describeArc(
            50,
            50,
            40,
            complete + partial,
            complete + partial + incomplete + 0.5
          )}
        ></path>
        <path
          className="arc partial"
          d={describeArc(50, 50, 40, complete, complete + partial + 0.5)}
        ></path>
        <path
          className="arc complete"
          d={describeArc(50, 50, 40, 0, complete + 0.5)}
        ></path>
      </svg>
    </main>
  );
}

export default App;
