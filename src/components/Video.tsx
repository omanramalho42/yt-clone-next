import React, { useEffect, useState } from "react"

import { motion } from 'framer-motion'

import { useRouter } from 'next/router'

import Image from "next/image"
import Link from 'next/link'

import { container, item  } from "../constants/filtersTopResponsive"

import Skeleton from "react-loading-skeleton"

import { ShelfVideoProps } from "./Content"
import { ChartBarOutline, ClockOutline } from "heroicons-react"

const Video = ({ 
  channelId,
  channelTitle,
  description,
  liveBroadcastContent,
  publishTime,
  publishedAt,
  videoId,
  thumbnails,
  title
} : ShelfVideoProps) => {
  
  const [useLoading, setUseLoading] = useState(true);

  useEffect(() => {
    if(!channelId) {
      setUseLoading(true);
    } else {
      setTimeout(() => 
        setUseLoading(false), 
        2000
      );
    }
  },[channelId]);

  const router = useRouter();

  if(useLoading) {
    return (
      <div className="flex-col w-full">
        <div className="container grid justify-center gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 flex-wrap">
          <Skeleton 
            width={250} 
            height={200} 
            containerClassName="w-full h-full rounded-2xl" 
          />
        </div>
        <div className="flex row my-2 space-x-2">
          <Skeleton width={26} height={26} circle />
          <Skeleton count={3} width={200} height={15} />
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="visible"
      className="bg-[#F9F9F9] dark:bg-[#202020] rounded-lg flex flex-col h-full items-center shadow-lg"
    >
      <Link href={`/video/${videoId}?channelId=${channelId}`} className="w-full">
        <Image
          alt="thumbnail" 
          src={{ 
            src: thumbnails.default.url, 
            width: thumbnails.default.width, 
            height: thumbnails.default.height 
          }}
          className="rounded-t-lg w-full h-full transition-all hover:scale-[1.03] hover:rounded-lg shadow-md" 
        />
      </Link>

      <div className="flex h-full items-center justify-between">
        <div className="w-full px-4 flex-col text-sm font-bold">
          <h3 className="text-sm mt-2 text-[#121212] mb-8 dark:text-[#F9F9F9]">
            { title }
          </h3>

          <div className="flex-col flex my-1">
            <div className="flex justify-between items-center">
              <div className="flex-col space-y-2">
                <motion.div variants={item} className="flex space-x-2 items-center">
                  <ChartBarOutline className="dark:text-white" />
                  <h3 className="font-medium dark:text-white">
                    Baixa
                  </h3>
                </motion.div>
                <motion.div variants={item} className="flex items-center space-x-2">
                  <ClockOutline className="dark:text-white" />
                  <h3 className="text-[12px] text-gray-600 dark:text-white">
                    5 min
                  </h3>
                </motion.div>
              </div>
              <motion.button
                variants={item}
                onClick={() => 
                  router.push(`/video/${videoId}?channelId=${channelId}`)
                } 
                className="bg-violet-800 shadow-lg hover:bg-violet-700 px-8 text-gray-100 rounded-md p-1"
              >
                iniciar
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Video