import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '../FormElements/Button.js';
import './SelectItem.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 'auto',
        },
    },
};

const SelectItem = props => {
    const history = useHistory();
    const [itemId, setItemId] = useState(" ");


    const selectItemNameAndId = (id) => {      
        props.handleSelectedItem(id)


    }

    const handleChange = (event) => {
        setItemId(event.target.value);
        selectItemNameAndId(event.target.value)

    };
    let select;
    if (props.loadedCreatedItem.length > 0) {
        select = <FormControl
            required sx={{ m: 1, minWidth: 120 }} style={{ width: '200px' }}>

            <InputLabel id="demo-simple-select-required-label">
                {props.selectItem}
            </InputLabel>

            <Select

                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={props.itemId ? props.itemId : itemId}
                label={`${props.selectItem} *`}
                onChange={handleChange}
                MenuProps={MenuProps}
            >

                <MenuItem value=" ">
                    <em>None</em>
                </MenuItem>

                {
                    props.loadedCreatedItem.map(item => {
                        return (
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

                        )

                    })
                }

            </Select>
         
        </FormControl>

    } else {
        select = <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
                value=""
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ color: 'red' }}

            >

                <MenuItem value="" style={{ color: 'red' }}>
                    <em>{props.noItem}</em>
                </MenuItem>

            </Select>
          

        </FormControl>

    }

    const addItemRouteHandler = () => {

        if (props.subId && props.topicId) {
          
            history.push(props.addItemRoute, {
                subId: props.subId,
                topicId: props.topicId
            })

        }
        else if (props.subId) {
            history.push(props.addItemRoute, {
                subId: props.subId
            })

        } else if (props.topicId) {
            history.push(props.addItemRoute, {
                topicId: props.topicId
            })
        } else {
            history.push(props.addItemRoute)
        }

    }

    let addButton;
    if (props.loadedCreatedItem.length === 0) {
        addButton =
            <Button
                style={{ padding: '15px', margin: '8px' }}
                onClick={addItemRouteHandler}>
                {props.addItemButton}
            </Button>
    }
    return (
        <>
            {select}
            {addButton}

        </>


    )


}

export default SelectItem;