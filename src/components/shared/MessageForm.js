import { Form, Button, Container } from 'react-bootstrap'

const MessageForm = (props) => {
    const { message, handleChange, handleSubmit } = props

    return (
        <Container className="w-100 mx-0 p-0">
            <Form onSubmit={handleSubmit} className='d-flex w-100 justify-content-end'>
                <Form.Group className='w-100 me-3' id='message-form-group'>
                    <Form.Control 
                        as="textarea"
                        rows={3}
                        name="content"
                        id="content"
                        value={message.content}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit" id="message-form-submit">&#187;</Button>
            </Form>
        </Container>
    )
}

export default MessageForm