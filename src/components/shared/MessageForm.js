import { Form, Button, Container } from 'react-bootstrap'

const MessageForm = (props) => {
    const { message, handleChange, handleSubmit } = props

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Send Message:</Form.Label>
                    <Form.Control 
                        type="textarea"
                        placeholder="..........."
                        name="content"
                        id="content"
                        value={message.content}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default MessageForm