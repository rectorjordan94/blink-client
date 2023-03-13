import { Form, Button, Container } from 'react-bootstrap'

const ReplyForm = (props) => {
    const { reply, handleChange, handleSubmit } = props

    return (
        <Container className="w-100 mx-0">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Send Message:</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={3}
                        name="content"
                        id="content"
                        value={reply ? reply.content : ""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ReplyForm