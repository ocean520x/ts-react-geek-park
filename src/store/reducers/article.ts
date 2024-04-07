export type ArticleType = {
  art_id: string;
  title: string;
  aut_id: string;
  comm_count: number;
  pubdate: string;
  aut_name: string;
  is_top: number;
  cover: {
    type: number;
    images: string[];
  };
};

export type ArticleStateType = {
  [channelId: number]: {
    results: ArticleType[];
    pre_timestamp: number;
  }
}
// 文章详情的类型
export type ArticleDetailType = {
  art_id: string;
  title: string;
  pubdate: string;
  aut_id: string;
  content: string;
  aut_name: string;
  aut_photo: string;
  is_followed: boolean;
  is_collected: boolean;
  attitude: number;
  comm_count: number;
  read_count: number;
  like_count: number;
}
const initialState = {
  articles: {} as ArticleStateType,
  detail: {} as ArticleDetailType,
}

type ArticleActionType = { type: 'article/saveList'; payload: { results: ArticleType[]; pre_timestamp: number; channel_id: number } } | { type: 'article/updateListById'; payload: { results: ArticleType[]; pre_timestamp: number; channel_id: number } } | {
  type: 'article/saveDetail'; payload: ArticleDetailType
}

export default function articleReducer(state = initialState, action: ArticleActionType) {
  switch (action.type) {
    case 'article/saveList':
      const { results, pre_timestamp, channel_id } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          [channel_id]: {
            results,
            pre_timestamp,
          },
        },
      };
    case 'article/updateListById':
      const { channel_id: update_id, pre_timestamp: update_timestamp, results: update_results } = action.payload
      const oldResultsById = state.articles[update_id]?.results || []
      const newResultsById = [...oldResultsById, ...update_results]
      return {
        ...state,
        articles: {
          ...state.articles,
          [update_id]: {
            results: newResultsById,
            pre_timestamp: update_timestamp
          }
        }
      };
    default:
      return state;
  }
}