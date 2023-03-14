import { Form, Button, Container } from 'react-bootstrap'

const ReplyForm = (props) => {
    const { reply, handleChange, handleSubmit } = props

    return (
        <Container className="w-100 mx-0 p-3 reply-form-container">
            <Form onSubmit={handleSubmit} className='d-flex w-100 justify-content-end'>
                <Form.Group id='reply-form-group' className='w-100 me-3' >
                    <Form.Control 
                        as="textarea"
                        rows={3}
                        name="content"
                        id="content"
                        value={reply ? reply.content : ""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit" id='reply-form-submit'>&#187;</Button>
            </Form>
        </Container>
    )
}

export default ReplyForm