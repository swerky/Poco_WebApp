export default interface SelectFieldProps {
  label: string
  placeholder: string
  handleChangeValue: (id: string) => void
  value: string | null | undefined
  suggestions: OptionType[]
}

export interface OptionType {
  label: string
  value: string
}