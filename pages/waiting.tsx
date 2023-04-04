import React, { useState } from "react"
import { motion, MotionConfig } from "framer-motion"
import { useAnimatedText } from "../hooks/use-animated-text"
// import { Scene } from "../components/Canvas"
import { transition } from "../components/Transition"


export default function Waiting() {
    
    // const [isOn, setOn] = useState(true)
    // const headerRef = useAnimatedText(isOn ? 8 : 9, transition)
  
    return (
        <div>
            Hola
        </div>
    // <MotionConfig transition={transition}>
    //   <motion.div
    //     className="container"
    //     initial={false}
    //     animate={{
    //       backgroundColor: isOn ? "#c9ffed" : "#ff2558",
    //       color: isOn ? "#7fffd4" : "#c70f46"
    //     }}
    //   >
    //     {/* <h1 className="open" children="<h1>" /> */}
    //     {/* <h1 className="close" children="</h1>" /> */}
    //     <motion.h1 ref={headerRef} />
    //     <Scene isOn={isOn} setOn={setOn} />
    //   </motion.div>
    // </MotionConfig>
  )
}
