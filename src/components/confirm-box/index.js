import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"

export default (props) => {
    return <Modal
        isOpen={props.isOpen}
        toggle={props.toggleModal}
        className={`modal-dialog-centered `}
    >
        <ModalHeader toggle={props.toggleModal}>
            {props.title}
        </ModalHeader>
        <ModalBody>
            <div className="d-flex flex-row align-items-center">
                {props.icon}
                <p className="confirm-msg">{props.message}</p>
            </div>
        </ModalBody>
        <ModalFooter>
            <Button color='danger' onClick={() => props.yesBtnClick()} type='button'>
                {props.yesBtn ?? 'Yes'}
            </Button>
            {
                !props.singleBtn &&
                <Button className='me-1' outline color='secondary' type='button' onClick={() => props.noBtnClick()}>
                    {props.noBtn ?? 'No'}
                </Button>
            }

        </ModalFooter>
    </Modal>
}
