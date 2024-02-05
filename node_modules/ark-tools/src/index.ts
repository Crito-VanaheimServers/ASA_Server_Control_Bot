import Loader from "./components/loaders/loader";
import Modal from "./components/modal/modal";
import FilterModal from "./components/modal/flterModal";
import Dropdown from "./components/dropdown/dropdown";
import DateRange from "./components/dateRange/dateRange";
import DatePicker from "./components/datePicker/datePicker";
import TextArea from "./components/textArea/textArea";
import NumericInput from "./components/numericInput/numericInput";
import TextInput from "./components/textInput/textInput";
import diff from "./utils/diff/diff";
import diffExcelBuilder from "./utils/diff/diffExcelBuilder";
import excelBuilder from "./utils/excelBuilder/excelBuilder";
import buildRequest from "./utils/mappingTools/buildRequest";
import commitModification from "./utils/mappingTools/commitModification";
import commitPeriodiModification from "./utils/mappingTools/commitPeriodiModification";
import deleteItem from "./utils/mappingTools/deleteItem";
import removeModification from "./utils/mappingTools/removeModification";
import filterReducer from "./reducers/filterReducer";
import tableFilterReducer from "./reducers/tableFilterReducer";
import tableReducer from "./reducers/tableReducer";
import queryBuilder from "./utils/request/queryBuilder";

const MappingTools = {
  buildRequest,
  commitModification,
  commitPeriodiModification,
  deleteItem,
  removeModification
};

const DiffTools = {
  diff,
  diffExcelBuilder
};

const ArkComponets = {
  Loader,
  Modal,
  FilterModal,
  Dropdown,
  DateRange,
  DatePicker,
  TextArea,
  NumericInput,
  TextInput
};

const ArkReducers = {
  filterReducer,
  tableFilterReducer,
  tableReducer
};

const Request = {
  queryBuilder
};

export {
  MappingTools,
  DiffTools,
  ArkComponets,
  ArkReducers,
  excelBuilder,
  Request
};
