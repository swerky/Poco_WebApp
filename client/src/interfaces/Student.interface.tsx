import moment from 'moment';

export default interface StudentInterface {
  id?: string
  firstName: string
  lastName?: string
  sexe?: string
  privateEmail?: string
  pocoEmail?: string
  residencePermit?: string
  birthday?: moment.Moment | null
  nationality?: string
  addressStreet?: string
  addressCity?: string
  addressNPA?: number | null
  addressCanton?: string
  organisation?: string
  socialAssistant?: SocialAssistantInterface
  financialParticipation?: string 
  financialParticipationComment?: string | null
  borrowLaptops?: boolean
  foodCost?: string | null
  presences?: PresenceInterface[] | null
  batch?: BatchClass
  /*createDate?: moment.Moment
  updateDate?: moment.Moment*/
}

export interface SocialAssistantInterface {
  id?: string | null // null if needed to be created
  firstName: string
  lastName: string
  phone?: string
  email?: string
}

export interface PresenceInterface {
  id?: string
  dateStart: moment.Moment
  dateEnd: moment.Moment
  goodExcuse: boolean
  reason: string
}

export interface BatchClass {
  id?: string | null
  name: string
  startingTime?: moment.Moment
  endTime?: moment.Moment
}

/* Special student interface */
export interface StudentAbsence {
  id?: string
  firstName: string
  lastName?: string
  presences?: PresenceInterface[] | null
  batch?: BatchClass
  pourcentage: number
  timeMissed: number
  nbAbsence: number
}

export interface StudentData {
  students: StudentInterface[]
}