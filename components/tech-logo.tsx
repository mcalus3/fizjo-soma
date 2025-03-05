import type React from "react"
import {
  ReactLogo,
  NextjsLogo,
  TensorFlowLogo,
  PytorchLogo,
  MongoDBLogo,
  NodejsLogo,
  ExpressLogo,
  PandasLogo,
  TypeScriptLogo,
  PythonLogo,
} from "./tech-logos"

interface TechLogoProps {
  name: string
  color: string
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, color }) => {
  const getLogo = () => {
    switch (name) {
      case "React":
        return <ReactLogo />
      case "Next.js":
        return <NextjsLogo />
      case "TensorFlow":
        return <TensorFlowLogo />
      case "PyTorch":
        return <PytorchLogo />
      case "MongoDB":
        return <MongoDBLogo />
      case "Node.js":
        return <NodejsLogo />
      case "Express":
        return <ExpressLogo />
      case "Pandas":
        return <PandasLogo />
      case "TypeScript":
        return <TypeScriptLogo />
      case "Python":
        return <PythonLogo />
      default:
        return null
    }
  }

  return (
    <div className="flex items-center gap-2 text-2xl mx-8" style={{ color }}>
      <div className="w-12 h-12">{getLogo()}</div>
      {name}
    </div>
  )
}

