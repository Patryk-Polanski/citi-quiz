import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { AppDispatch, RootState } from "src/store/store";

type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
