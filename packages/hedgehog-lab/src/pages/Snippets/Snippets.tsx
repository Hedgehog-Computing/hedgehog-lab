import React from "react";
import {Box, Button, CardActionArea, Chip, Divider, Link, Pagination, Paper, Typography} from "@mui/material";
import {CopyBlock, dracula} from "react-code-blocks";
import {StarBorderOutlined} from "@mui/icons-material";
import {Link as RouterLink} from 'react-router-dom'
import RenameDialog from "../../components/Snippet/Rename/RenameDialog";
import DeletePopup from "../../components/Snippet/Delete/DeletePopup";
import SharePopup from "../../components/Snippet/Share/SharePopup";

const printCode = `
{
    "version": 2,
    "name": "now-laravel-core",
    "scope": "your scope",
    "regions": [
    "all"
    ],
    "public": true,
    "builds": [
    
    
`

const Snippets = (): React.ReactElement => {

    return (
        <>
            {Array.from(Array(3).keys()).map((item, index) => {
                return (
                    <Box key={index}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box alignItems={"center"} display={"flex"}>
                                <Link component={RouterLink} variant={'body1'} underline={"hover"} to={'/hhlab'}>
                                    hhlab
                                </Link>

                                <span style={{margin: ' 0 2px'}}>/</span>

                                <Link component={RouterLink} variant={'body1'} underline={"hover"} to={'/hhlab/simple'}>
                                    simple
                                </Link>

                                <Chip variant={'outlined'} label={'Secret'} size={'small'} sx={{ml: '10px'}}/>
                            </Box>

                            <Box>
                                <Button color={'inherit'}
                                        startIcon={<StarBorderOutlined/>}>
                                    1 stars
                                </Button>

                                <RenameDialog/>

                                <SharePopup url={'https://exampleSnippet.com'}/>

                                <DeletePopup/>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant={'body2'}>
                                Last active 11 months ago <br/>
                                Visual Studio Code Settings Sync Gist
                            </Typography>

                            <Paper elevation={0} sx={{mt: '10px'}}>
                                <CardActionArea component={RouterLink} to={'/hhlab/simple'}>
                                    <Box sx={{
                                        '& button': {
                                            display: 'none'
                                        }
                                    }}>
                                        <CopyBlock showLineNumbers text={printCode} language={'javascript'}
                                                   theme={dracula}/>
                                    </Box>
                                </CardActionArea>
                            </Paper>
                        </Box>

                        <Divider sx={{my: '20px'}}/>
                    </Box>
                )
            })
            }

            <Pagination count={10}/>
        </>
    )
}

export default Snippets
