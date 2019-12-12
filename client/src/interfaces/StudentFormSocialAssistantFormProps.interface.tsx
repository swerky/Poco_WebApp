import {SocialAssistantInterface} from './Student.interface';
import StudentInterface from './Student.interface';

export default interface StudentFormSocialAssistantFormProps {
  handleTextSocialAssistantChange: (name: keyof SocialAssistantInterface) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleIdSocialAssistantChange: (id: string) => void,
  socialAssistant: SocialAssistantInterface,
  newSocialAssistant: boolean,
  setNewSocialAssistant: (newSocialAssistant: boolean) => void,
}