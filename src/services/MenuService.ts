import axios, { AxiosResponse } from 'axios'
import { ENDPOINT, apiBaseURL } from '../config/constants'

class MenuService {
  async list (): Promise<AxiosResponse> {
    return await axios.get(`${apiBaseURL}/${ENDPOINT.MENU_LIST}`)
  }
}

export default MenuService
