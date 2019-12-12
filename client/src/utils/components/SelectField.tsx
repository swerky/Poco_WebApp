import React, { CSSProperties, FunctionComponent, HTMLAttributes, useState } from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { createStyles, emphasize, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import Select from 'react-select';
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { Omit } from '@material-ui/types';
import { ValueType } from 'react-select/src/types';
import SelectFieldProps, {OptionType} from './SelectField.interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 250,
      minWidth: 290,
    },
    input: {
      display: 'flex',
      padding: 0,
      height: 'auto',
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2),
    },
    singleValue: {
      fontSize: 16,
      marginTop: theme.spacing(2)
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      bottom: 6,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0,
    },
  }),
);

function NoOptionsMessage(props: NoticeProps<OptionType>) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

type InputComponentProps = Pick<BaseTextFieldProps, 'inputRef'> & HTMLAttributes<HTMLDivElement>;

function inputComponent({ inputRef, ...props }: InputComponentProps) {
  return <div ref={inputRef} {...props} />;
}

function Control(props: ControlProps<OptionType>) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
      style={{paddingRight: '16px', marginLeft: '8px'}} 
    />
  );
}

function Option(props: OptionProps<OptionType>) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

type MuiPlaceholderProps = Omit<PlaceholderProps<OptionType>, 'innerProps'> &
  Partial<Pick<PlaceholderProps<OptionType>, 'innerProps'>>;
function Placeholder(props: MuiPlaceholderProps) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

function SingleValue(props: SingleValueProps<OptionType>) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props: ValueContainerProps<OptionType>) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props: MenuProps<OptionType>) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

/* TODO: Ajouter la list et la modification dans les props */
/* StudentFormSocialAssistant */
const SelectField : FunctionComponent<SelectFieldProps> = ({label, placeholder, suggestions, handleChangeValue, value}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState<ValueType<OptionType>>(null);

  if(value && single === null){
    let selected = suggestions.find((suggestion) => suggestion.value === value)
    console.log(selected);
    setSingle(selected);
  }

  // handelChangeSingle
  const handleChangeSingle = (value: ValueType<OptionType>) => {
    let fieldValue = (value as any);
    setSingle(value);
    handleChangeValue(fieldValue.value);
  };

  const selectStyles = {
    input: (base: CSSProperties) => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <NoSsr>
      <Select
        classes={classes}
        styles={selectStyles}
        inputId="react-select-single"
        TextFieldProps={{
          label: label,
          InputLabelProps: {
            htmlFor: 'react-select-single',
            shrink: true,
          },
        }}
        placeholder={placeholder}
        options={suggestions}
        components={components}
        value={single}
        onChange={handleChangeSingle}
      />
    </NoSsr>
  );
}

export default SelectField;