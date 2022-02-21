import { AxiosResponse } from 'axios'
import { Flow } from '@/models/Flow'
import { Api, Route } from '@/services/Api'
import { UnionFilters } from '@/services/Filter'

export type IFlowResponse = {
  created: string,
  id: string,
  name: string,
  tags: string[],
  updated?: string,
}

export class FlowsApi extends Api {

  protected route: Route = '/flows'

  public getFlows(filter: UnionFilters): Promise<Flow[]> {
    return this.post<IFlowResponse[]>('/filter', filter).then(this.mapFlowsResponse)
  }

  public getFlowsCount(filter: UnionFilters): Promise<number> {
    return this.post<number>('/count', filter).then(({ data }) => data)
  }

  protected mapFlow(data: IFlowResponse): Flow {
    return new Flow({
      ...data,
      updated: data.updated ? new Date(data.updated) : null,
      created: new Date(data.created),
    })
  }

  protected mapFlowResponse({ data }: AxiosResponse<IFlowResponse>): Flow {
    return this.mapFlow(data)
  }

  protected mapFlowsResponse({ data }: AxiosResponse<IFlowResponse[]>): Flow[] {
    return data.map(this.mapFlow)
  }

}

export const flowsApi = new FlowsApi()