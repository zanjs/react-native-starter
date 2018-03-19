import { fetchThemeList } from '../services/themes'
import { createAction } from '../utils'

export default {
  namespace: 'themes',
  state: {
    list: {},
    loading: true,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      yield put(createAction('updateState')({ loading: true }))
      const data = yield call(fetchThemeList, payload)
      console.log("___fetched\r")
      console.log(data)
      yield put(createAction('updateState')({ list: data, loading: false }))
    },
  },
}
