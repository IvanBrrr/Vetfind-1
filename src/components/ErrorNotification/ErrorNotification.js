import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";
import {connect} from "react-redux";

const ErrorNotification = ({ error = {} }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (Object.keys(error).length) {
            setOpen(true)
        }
    }, [error])
    console.log(error)
    const handleClose = () => {
        setOpen(false);
    };

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        fullWidth={"sm"}
    >
        <DialogTitle id="simple-dialog-title">Ошибка !!!</DialogTitle>
        <DialogContent>
            <DialogContentText>
                error: {error.error},<br />
                message: {error.message},<br />
                path: {error.path}
            </DialogContentText>

        </DialogContent>
    </Dialog>
};

const mapStateToProps = (state) => {
    return {
        error: state.error
    }
}

export default connect(mapStateToProps, {})(ErrorNotification);