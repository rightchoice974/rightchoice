const firebaseConfig = {
    apiKey: "AIzaSyBBIKs2SpE6hH_tW3qM-DQE8bHOlHoprSQ",
    authDomain: "rightchoiceform.firebaseapp.com",
    projectId: "rightchoiceform",
    storageBucket: "rightchoiceform.firebasestorage.app",
    messagingSenderId: "964021442183",
    appId: "1:964021442183:web:298c98749c6ecb654d0a22",
    measurementId: "G-234ZVCZWYY",
    databaseURL: "https://rightchoiceform-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const loadingDiv = document.getElementById('loading');
const dashboardContent = document.getElementById('dashboard-content');
const logoutBtn = document.getElementById('logout-btn');

// Protect the page
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        loadingDiv.style.display = 'none';
        dashboardContent.style.display = 'block';
        loadSubmissions();
    } else {
        // No user is signed in
        window.location.href = 'login.html';
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        console.log('User signed out.');
    }).catch((error) => {
        console.error('Sign out error', error);
    });
});

function loadSubmissions() {
    const applicationsRef = database.ref('applications');
    const messagesRef = database.ref('messages');

    // Load Job Applications
    applicationsRef.on('value', (snapshot) => {
        const tableBody = document.getElementById('applications-table-body');
        tableBody.innerHTML = '';
        if (!snapshot.exists()) {
            tableBody.innerHTML = '<tr><td colspan="6" class="no-data">No applications found.</td></tr>';
            return;
        }
        snapshot.forEach((childSnapshot) => {
            const key = childSnapshot.key;
            const data = childSnapshot.val();
            const date = new Date(data.submittedAt).toLocaleString();
            
            // MODIFIED: Added data-label attributes to each <td> for mobile responsiveness
            const row = `
                <tr>
                    <td data-label="Status"><i class="fas fa-circle status-toggle ${data.status}" data-key="${key}" data-path="applications" title="Click to toggle status"></i></td>
                    <td data-label="Name">${data.name || ''}</td>
                    <td data-label="Contact">${data.contact || ''}</td>
                    <td data-label="Email">${data.email || ''}</td>
                    <td data-label="Submitted">${date}</td>
                    <td data-label="Actions"><button class="action-btn delete-btn" data-key="${key}" data-path="applications"><i class="fas fa-trash-alt"></i></button></td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('afterbegin', row);
        });
    });

    // Load Contact Messages
    messagesRef.on('value', (snapshot) => {
        const tableBody = document.getElementById('messages-table-body');
        tableBody.innerHTML = '';
        if (!snapshot.exists()) {
            tableBody.innerHTML = '<tr><td colspan="7" class="no-data">No messages found.</td></tr>';
            return;
        }
        snapshot.forEach((childSnapshot) => {
            const key = childSnapshot.key;
            const data = childSnapshot.val();
            const date = new Date(data.submittedAt).toLocaleString();

            // MODIFIED: Added data-label attributes to each <td> for mobile responsiveness
            const row = `
                <tr>
                    <td data-label="Status"><i class="fas fa-circle status-toggle ${data.status}" data-key="${key}" data-path="messages" title="Click to toggle status"></i></td>
                    <td data-label="Name">${data.name || ''}</td>
                    <td data-label="Email">${data.email || ''}</td>
                    <td data-label="Subject">${data.subject || ''}</td>
                    <td data-label="Message">${data.message || ''}</td>
                    <td data-label="Submitted">${date}</td>
                    <td data-label="Actions"><button class="action-btn delete-btn" data-key="${key}" data-path="messages"><i class="fas fa-trash-alt"></i></button></td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('afterbegin', row);
        });
    });
}

// Event delegation for delete and status toggle
document.body.addEventListener('click', function(event) {
    const target = event.target;

    // Handle Delete
    const deleteButton = target.closest('.delete-btn');
    if (deleteButton) {
        const key = deleteButton.dataset.key;
        const path = deleteButton.dataset.path;
        if (confirm('Are you sure you want to delete this entry?')) {
            database.ref(path + '/' + key).remove()
                .then(() => console.log('Entry deleted'))
                .catch(err => console.error('Delete failed:', err));
        }
    }

    // Handle Status Toggle
    const statusToggle = target.closest('.status-toggle');
    if (statusToggle) {
        const key = statusToggle.dataset.key;
        const path = statusToggle.dataset.path;
        const newStatus = statusToggle.classList.contains('new') ? 'read' : 'new';
        database.ref(path + '/' + key).update({ status: newStatus })
            .then(() => console.log('Status updated'))
            .catch(err => console.error('Update failed:', err));
    }
});
