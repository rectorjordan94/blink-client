import { Form, Button, Container } from 'react-bootstrap'

const ChannelForm = (props) => {
    const { channel, handleChange, handleSubmit, heading, buttonText } = props

    return (
        <Container className='d-flex flex-column' id="create-channel-container">
            <Form onSubmit={handleSubmit} className='auth-form'>
                <h1 className='text-center auth-header'>{heading}</h1>
                <Form.Group className='container'>
                    <Form.Label className='auth-label'>Name:</Form.Label>
                    <Form.Control
                        className='auth-control'
                        placeholder="What would you like to name the channel?"
                        name="name"
                        id="name"
                        type="text"
                        value={channel.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='container mt-3'>
                    <Form.Label className='auth-label'>Description:</Form.Label>
                    <Form.Control
                        className='auth-control'
                        placeholder="What's the channel about? Who is it for?"
                        name="description"
                        id="name"
                        as="textarea"
                        value={channel.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <div className="container d-flex justify-content-center mt-3">
                    <Button type="submit" className='auth-submit'>{buttonText}</Button>
                </div>
                
            </Form>
        </Container>
    )
}

export default ChannelForm