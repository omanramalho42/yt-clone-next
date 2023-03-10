import React, { lazy, useEffect, useReducer, useState } from 'react'

import axios from 'axios';

const ContentVideos = lazy(() => import('./ContentVideos'))

import { motion } from 'framer-motion'

import FiltersTop from './FiltersTop'

import { mockVideos } from '../utils/mockVideos'

export interface ShelfVideoProps {
  kind?: string; 
  videoId?: string;
  channelId?:string;
  channelTitle:string;
  description?:string;
  liveBroadcastContent?:string;
  publishTime?:string;
  publishedAt?:string;
  thumbnails: {
    default: {
      url: string;
      width: number; 
      height: number;
    }
    high?: {
      url: string;
      width: number; 
      height: number;
    }
    medium?: {
      url: string;
      width: number; 
      height: number;
    }
  }
  title:string;
}

export interface VideoProps {
  description: string; 
  bestThumbnail: any; 
  title: string; 
  url: string; 
  views: null | number; 
  author: { 
    name: string;
    avatar: {
      url: string;
      width: number;
      heigth: number;
    } 
    url: string;
  }; 
  id: string;
  duration: string;
  badges?: any[];
  isLive?: string;
  isUpcoming?: string;
  subscribers: string;
  thumbnails: any[];
  type: string;
  verified: boolean;
  upcoming?: string;
  uploadedAt: string;
}

interface ContentProps {
  search: string;
}


const initialState = {
  videos: []
}

const reducer = (action:any, payload:any) => {
  switch(action.type) {
    case 'SETVIDEOS':
      action.videos = payload?.map((i:any) => i);
    break;
    default:
    return { 
      ...action 
    }
  }
}

const API = 'AIzaSyAWnSk8uTxl2n8PUZ0dOUELLhFwcOF9l5k';
const channelId = 'UCvphc_K3Cd0YFTygQsvKUEQ';

const Content:React.FC<ContentProps> = ({ search }) => {
  const [useShelfVideos, setUseShelfVideos] = useState<any[]>([]);
  const [useVideos] = useState<ShelfVideoProps[]>(mockVideos);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // aurelioalfieri
    let nextPage = "";
    const options = {
      method: 'GET',
      url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&q=aurelio%2Balfieri&key=${API}&pageToken=${nextPage}`,
    };
    
    axios.request(options).then(function (response) {
      let array: ShelfVideoProps[] = [];
      response.data.items.map(
        (i: any) => {
          let videoId = i.id.videoId;
          let { 
            channelId, 
            channelTitle, 
            description, 
            kind, 
            liveBroadcastContent, 
            publishTime, 
            publishedAt, 
            thumbnails, 
            title 
          }: ShelfVideoProps = i.snippet;
          
          array.push({ 
            channelId,
            channelTitle,
            description,
            kind,
            liveBroadcastContent,
            publishedAt,
            publishTime,
            thumbnails,
            title,
            videoId 
          });
        }
      )

      setUseShelfVideos(array);
    }).catch(function (error) {
      console.error(error.message);
    });

    dispatch({ 
      type: 'SETVIDEOS', 
      payload: mockVideos 
    });
  },[]);

  console.log(state,'reducer state');

  const [useFilterVideo, setUseFilterVideos] = useState("");

  return (
    <div className='flex-1 w-full flex-col'>
      <FiltersTop 
        setFilter={setUseFilterVideos} 
        filter={useFilterVideo}
      />
      
      <div className='flex xl:mx-40 lg:mx-30 md:mx-20'>
        <ContentVideos 
          videos={useShelfVideos.length > 0 ? useShelfVideos : useVideos} 
          filter={useFilterVideo}
          search={search}
        />
      </div>
    </div>
  )
}

export default Content;