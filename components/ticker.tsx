'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

interface Stats {
  totalSum: number
  chatUsage: number
  writerUsage: number
  searchUsage: number
  translatorUsage: number
  directoryUsage: number
  creditsUsed: number
  activeSubscribers: number
}

export function Ticker() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 3600000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      console.log("Datos recibidos:", data) // Debug
      
      // Verificar que totalSum es un número
      if (typeof data.totalSum !== 'number') {
        console.error('totalSum no es un número:', data.totalSum)
        return
      }

      setStats(data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  if (!stats) {
    console.log("Stats es null") // Debug
    return null
  }

  console.log("Renderizando con stats:", stats) // Debug

  return (
    <div className="container mx-auto px-4">
      {/* Título general */}
      <h2 className="text-center text-2xl md:text-3xl font-medium mb-8 text-gray-800 dark:text-gray-200">
        Métricas en Tiempo Real
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[60px] md:mt-[120px] mb-[120px] md:mb-[250px]">
        {/* Visitantes */}
        <div className="text-center flex flex-col space-y-4">
          <span className="font-medium font-mono text-center text-[40px] md:text-[80px] lg:text-[100px] leading-none text-transparent dark:text-transparent [text-shadow:none] [-webkit-text-stroke:1px_#000] dark:[-webkit-text-stroke:1px_#fff]">
            {Intl.NumberFormat("en-US", {
              maximumFractionDigits: 0,
            }).format(stats.totalSum)}
          </span>
          <span className="text-gray-600 dark:text-[#878787]">
            Visitas totales
          </span>
        </div>

        {/* Créditos Usados */}
        <div className="text-center flex flex-col space-y-4">
          <span className="font-medium font-mono text-center text-[40px] md:text-[80px] lg:text-[100px] leading-none text-transparent dark:text-transparent [text-shadow:none] [-webkit-text-stroke:1px_#000] dark:[-webkit-text-stroke:1px_#fff]">
            {Intl.NumberFormat("en-US", {
              maximumFractionDigits: 0,
            }).format(stats.creditsUsed)}
          </span>
          <span className="text-gray-600 dark:text-[#878787]">
            Créditos usados
          </span>
        </div>

        {/* Suscriptores Activos */}
        <div className="text-center flex flex-col space-y-4">
          <span className="font-medium font-mono text-center text-[40px] md:text-[80px] lg:text-[100px] leading-none text-transparent dark:text-transparent [text-shadow:none] [-webkit-text-stroke:1px_#000] dark:[-webkit-text-stroke:1px_#fff]">
            {Intl.NumberFormat("en-US", {
              maximumFractionDigits: 0,
            }).format(stats.activeSubscribers)}
          </span>
          <span className="text-gray-600 dark:text-[#878787]">
            Clientes Activos
          </span>
        </div>
      </div>
    </div>
  )
}