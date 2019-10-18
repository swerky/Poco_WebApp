import {BatchClass} from './Student.interface';
import {MaterialUiPickersDate} from '@material-ui/pickers';

export default interface StudentFormBatchProps {
  batch: BatchClass,
  handleTextBatchChange: (name: keyof BatchClass) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleDateBatchChange: (date: MaterialUiPickersDate | null, name: keyof BatchClass) => void,
  newBatch: boolean,
  setNewBatch: (newBatch: boolean) => void
}