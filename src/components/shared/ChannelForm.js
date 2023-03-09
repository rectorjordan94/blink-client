import { Form, Button, Container } from 'react-bootstrap'

const ChannelForm = (props) => {
    const { channel, handleChange, handleSubmit } = props

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        placeholder="What would you like to name the channel?"
                        name="name"
                        id="name"
                        type="text"
                        value={channel.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        placeholder="What's the channel about? Who is it for?"
                        name="description"
                        id="name"
                        as="textarea"
                        value={channel.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ChannelForm