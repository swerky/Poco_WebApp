export default interface SelectFieldProps {
  label: string
  placeholder: string
  suggestions: OptionType[]
}

export interface OptionType {
  label: string
  value: string
}