import React from 'react'
import process from 'process';
import {motion, useMotionValue, useTransform, useAnimation} from "framer";

export const AnimalCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
    >
      <div className="carta-tinder">
        <h1>Título de la carta</h1>
        <p>Contenido de la carta...</p>
      </div>
    </motion.div>
  )
}
