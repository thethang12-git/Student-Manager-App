import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import StudentService from '@/service/studentList';
import StudentList from '@/components/studentList';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 100,
      },
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function DropDownForClassCount({studentName,setStudentName} : any ) {
  const theme = useTheme();
  useEffect(() => {if(!studentName){setPersonName('')}},[studentName])
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [studentList,setStudentList] = useState<string[]>([])
  useEffect ( () => {
    StudentService.getData().then(res => {setStudentList(res.data.map((itm: { name: any; })  => itm.name))})
        // setStudentList(prev => [...prev,res.data.name])})
  },[])
  const handleChange = (event) => {
    setPersonName(event.target.value);
    setStudentName(event.target.value)
  };
  return (
    <div>
      <FormControl sx={{ m: 0, width: '100%' }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {studentList.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
