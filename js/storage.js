const Storage = {
  KEYS: {
    USER: 'cerai_user',
    SESSION: 'cerai_session',
    ORDERS: 'cerai_orders',
    PAYMENT: 'cerai_payment',
    RATINGS: 'cerai_ratings',
    DOC_DATA: 'cerai_doc_data'
  },

  saveUser(data) {
    localStorage.setItem(this.KEYS.USER, JSON.stringify(data));
  },

  getUser() {
    const data = localStorage.getItem(this.KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  saveSession(nama) {
    localStorage.setItem(this.KEYS.SESSION, JSON.stringify({ nama, loginAt: new Date().toISOString() }));
  },

  getSession() {
    const data = localStorage.getItem(this.KEYS.SESSION);
    return data ? JSON.parse(data) : null;
  },

  clearSession() {
    localStorage.removeItem(this.KEYS.SESSION);
  },

  isLoggedIn() {
    return !!this.getSession();
  },

  logout() {
    this.clearSession();
    window.location.href = 'index.html';
  },

  saveOrder(order) {
    const orders = this.getOrders();
    orders.push({
      id: 'CP-' + Date.now(),
      ...order,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
  },

  getOrders() {
    const data = localStorage.getItem(this.KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  clearOrders() {
    localStorage.removeItem(this.KEYS.ORDERS);
  },

  savePayment(type, data) {
    const payments = this.getPayments();
    payments[type] = { ...data, paidAt: new Date().toISOString() };
    localStorage.setItem(this.KEYS.PAYMENT, JSON.stringify(payments));
  },

  getPayments() {
    const data = localStorage.getItem(this.KEYS.PAYMENT);
    return data ? JSON.parse(data) : {};
  },

  hasPaid(type) {
    const payments = this.getPayments();
    return !!payments[type];
  },

  saveRating(rating) {
    const ratings = this.getRatings();
    ratings.push({ ...rating, createdAt: new Date().toISOString() });
    localStorage.setItem(this.KEYS.RATINGS, JSON.stringify(ratings));
  },

  getRatings() {
    const data = localStorage.getItem(this.KEYS.RATINGS);
    return data ? JSON.parse(data) : [];
  },

  saveDocData(data) {
    localStorage.setItem(this.KEYS.DOC_DATA, JSON.stringify(data));
  },

  getDocData() {
    const data = localStorage.getItem(this.KEYS.DOC_DATA);
    return data ? JSON.parse(data) : {};
  },

  savePrintInvoice(data) {
    localStorage.setItem('cerai_print_invoice', JSON.stringify(data));
  },

  getPrintInvoice() {
    const data = localStorage.getItem('cerai_print_invoice');
    return data ? JSON.parse(data) : null;
  },

  savePrintSurat(data) {
    localStorage.setItem('cerai_print_surat', JSON.stringify(data));
  },

  getPrintSurat() {
    const data = localStorage.getItem('cerai_print_surat');
    return data ? JSON.parse(data) : null;
  },

  saveChatSession(lawyerName) {
    const sessions = this.getChatSessions();
    const id = 'CHAT-' + Date.now();
    sessions.push({ id, lawyer: lawyerName, startedAt: new Date().toISOString() });
    localStorage.setItem('cerai_chat_sessions', JSON.stringify(sessions));
    return id;
  },

  getChatSessions() {
    const data = localStorage.getItem('cerai_chat_sessions');
    return data ? JSON.parse(data) : [];
  },

  getChatKey(sessionId) {
    return 'cerai_chat_messages_' + sessionId;
  },

  getChatMessages(sessionId) {
    const key = this.getChatKey(sessionId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  saveChatMessage(sessionId, text, sender) {
    const key = this.getChatKey(sessionId);
    const messages = this.getChatMessages(sessionId);
    messages.push({ text, sender, timestamp: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(messages));
  },

};
