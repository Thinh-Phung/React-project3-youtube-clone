import { HomePageVideos } from "./../../Types";
import { YOUTUBE_API_URL } from "./../../ultils/constants";
import { RootState } from "./../index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseData } from "../../ultils";
import axios from "axios";
const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtubeAPP/homePageVideos",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(`${YOUTUBE_API_URL}/
    search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=
    snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`);
    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);
