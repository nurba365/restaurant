import jwt from 'jsonwebtoken';

export const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Тесттік логин (нақты жағдайда база тексеру керек)
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: 'Қате логин немесе пароль' });
};

export const registerUser = (req, res) => {
  // Болашақта базаға жаңа қолданушы қосу
  res.json({ success: true, message: 'Тіркелу сәтті өтті' });
};
