import { useState, useRef } from 'react';
import {
    Box,
    IconButton,
    TextField,
    Paper,
    Typography,
    Avatar,
    Fade
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { askChatbot } from '../services/chatbotService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatBox() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Xin chào! Bạn cần hỗ trợ gì?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSend = async () => {
        if (!input.trim()) return;
        setMessages(msgs => [...msgs, { from: 'user', text: input }]);
        setInput('');
        setLoading(true);
        try {
            const data = await askChatbot(input);
            setMessages(msgs => [
                ...msgs,
                { from: 'bot', text: data?.answer || 'Xin lỗi, tôi chưa trả lời được.' }
            ]);
        } catch {
            setMessages(msgs => [
                ...msgs,
                { from: 'bot', text: 'Có lỗi xảy ra, vui lòng thử lại.' }
            ]);
        }
        setLoading(false);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 9999 }}>
            {!open && (
                <IconButton
                    color="primary"
                    sx={{
                        bgcolor: 'white',
                        boxShadow: 6,
                        width: 64,
                        height: 64,
                        transition: '0.2s',
                        '&:hover': { bgcolor: 'primary.light', color: 'white', boxShadow: 12 }
                    }}
                    onClick={() => setOpen(true)}
                >
                    <ChatIcon sx={{ fontSize: 36 }} />
                </IconButton>
            )}
            <Fade in={open}>
                <Paper
                    elevation={12}
                    sx={{
                        width: 370,
                        height: 500,
                        display: open ? 'flex' : 'none',
                        flexDirection: 'column',
                        p: 0,
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #f8fafc 0%, #e3f2fd 100%)',
                        boxShadow: 12,
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 2,
                            py: 1.5,
                            bgcolor: 'primary.main',
                            color: 'white',
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            boxShadow: 2
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={1}>
                            <SmartToyIcon />
                            <Typography variant="subtitle1" fontWeight={600}>
                                Trợ lý Rao Vặt
                            </Typography>
                        </Box>
                        <IconButton size="small" sx={{ color: 'white' }} onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {/* Chat messages */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            px: 2,
                            py: 2,
                            bgcolor: 'transparent',
                            scrollbarWidth: 'thin'
                        }}
                    >
                        {messages.map((msg, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    display: 'flex',
                                    flexDirection: msg.from === 'user' ? 'row-reverse' : 'row',
                                    alignItems: 'flex-end',
                                    mb: 2
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: msg.from === 'user' ? 'primary.main' : 'grey.300',
                                        width: 32,
                                        height: 32,
                                        ml: msg.from === 'user' ? 1 : 0,
                                        mr: msg.from === 'bot' ? 1 : 0
                                    }}
                                >
                                    {msg.from === 'user' ? <PersonIcon /> : <SmartToyIcon color="primary" />}
                                </Avatar>
                                <Box
                                    sx={{
                                        maxWidth: '75%',
                                        bgcolor: msg.from === 'user' ? 'primary.main' : 'grey.200',
                                        color: msg.from === 'user' ? 'white' : 'grey.900',
                                        px: 2,
                                        py: 1.2,
                                        borderRadius: 3,
                                        borderBottomRightRadius: msg.from === 'user' ? 4 : 12,
                                        borderBottomLeftRadius: msg.from === 'bot' ? 4 : 12,
                                        fontSize: 15,
                                        boxShadow: 1,
                                        wordBreak: 'break-word'
                                    }}
                                >{msg.from === 'bot'
                                    ? <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            ul: ({ node, ...props }) => <ul style={{ margin: 0, paddingLeft: 18 }} {...props} />,
                                            li: ({ node, ...props }) => <li style={{ marginBottom: 4 }} {...props} />,
                                            a: ({ node, ...props }) => (
                                                <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline' }} />
                                            )
                                        }}
                                    >
                                        {msg.text}
                                    </ReactMarkdown>
                                    : msg.text}
                                </Box>
                            </Box>
                        ))}
                        {/* Messenger typing indicator */}
                        {loading && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
                                    mb: 2
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: 'grey.300',
                                        width: 32,
                                        height: 32,
                                        mr: 1
                                    }}
                                >
                                    <SmartToyIcon color="primary" />
                                </Avatar>
                                <Box
                                    sx={{
                                        maxWidth: '75%',
                                        bgcolor: 'grey.200',
                                        color: 'grey.900',
                                        px: 2,
                                        py: 1.2,
                                        borderRadius: 3,
                                        borderBottomLeftRadius: 12,
                                        fontSize: 15,
                                        boxShadow: 1,
                                        minWidth: 44,
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: 32
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '2px'
                                    }}>
                                        <span className="dot" />
                                        <span className="dot" />
                                        <span className="dot" />
                                    </Box>
                                </Box>
                                <style jsx>{`
                  .dot {
                    display: inline-block;
                    width: 7px;
                    height: 7px;
                    margin: 0 1px;
                    background: #888;
                    border-radius: 50%;
                    opacity: 0.5;
                    animation: blink 1.4s infinite both;
                  }
                  .dot:nth-child(2) {
                    animation-delay: 0.2s;
                  }
                  .dot:nth-child(3) {
                    animation-delay: 0.4s;
                  }
                  @keyframes blink {
                    0%, 80%, 100% { opacity: 0.5; }
                    40% { opacity: 1; }
                  }
                `}</style>
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>
                    {/* Input */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2,
                            py: 1.5,
                            borderTop: '1px solid #e3e3e3',
                            bgcolor: 'white'
                        }}
                    >
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Nhập câu hỏi..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            disabled={loading}
                            sx={{
                                bgcolor: '#f5f5f5',
                                borderRadius: 2
                            }}
                            inputProps={{ style: { fontSize: 15 } }}
                        />
                        <IconButton
                            color="primary"
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            sx={{
                                bgcolor: 'primary.light',
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.main' }
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
}