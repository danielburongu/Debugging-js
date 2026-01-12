# Terminal String Styling & Logging

A colorful, interactive Node.js terminal demonstration featuring ANSI styling, progress bars, spinners, status logs, pretty tables, diff views, and more.

Learning terminal output formatting or as a starter template for beautiful CLI tools.


## Features

- Colored text & background styling  
- Bold, underline & combined styles  
- Animated progress bar  
- Unicode spinner animation  
- Status indicators with icons
- Timestamped logging  
- Pretty console tables  
- Diff-style output (+ green / - red)  
- Boxed welcome message  
- CLI mode: `node terminal_string.js success "Task done!"`  
- Help screen when run without arguments

## Demo

```bash
# Show demo
node terminal_string.js

# Simple colored logger
  node terminal_string.js                          → show this demo
  node terminal_string.js info "Starting up..."    → info message
  node terminal_string.js success "Done!"          → success message
  node terminal_string.js warn "Low stock"         → warning
  node terminal_string.js error "Failed"           → error message

Enjoy the colors!
