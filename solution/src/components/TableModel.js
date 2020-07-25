import React, { memo } from "react";
import { Table, TableRow, TableCell, TableBody, TableContainer, TableHead, FormControl, Input, InputAdornment, Typography, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    margin: {
        margin: theme.spacing(1),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'

    },
}));

const Search = require('@material-ui/icons/Search').default

const TableModel = memo(({ header, data, type, placeholder, setPesquisa, sendToUpdate, changeSelect }) => {
    const classes = useStyles();

    return (
        <div style={{ width: '100%', height: '100%' }}>

            <FormControl className={classes.margin}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>
                    <Input
                        style={{ width: '85%' }}
                        placeholder={placeholder}
                        // value={pesquisa}
                        onChange={e => { setPesquisa(e.target.value); }}
                        // id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        }
                    />
                    <Select
                        style={{ width: '13%' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        onChange={e => changeSelect(e.target.value)}
                    >
                        <MenuItem value={'name'}>Name</MenuItem>
                        <MenuItem value={'slug'}>Slug</MenuItem>

                    </Select>
                </div>
            </FormControl>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                header.map((v, index) => <TableCell style={{ backgroundColor: 'DodgerBlue' }} component="th" id={index} scope="row" padding="none"><Typography style={{ color: 'white' }}>{v}</Typography></TableCell>)
                            }
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {data.map(
                            (v) => <TableRow onClick={_ => sendToUpdate(v.id, v)}>
                                {
                                    Object.keys(v).map(key =>
                                        key !== "id" &&

                                        <TableCell>{v[key]}</TableCell>
                                    )}
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>



        </div>
    )
})


export default TableModel;