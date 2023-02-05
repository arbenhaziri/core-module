export interface ActionIState {
  isLoading: boolean;
  error: Object | string | null;
  message: string;
  isSuccess: boolean;
  actionName?: string | null;
  statusCode?: number;
}
