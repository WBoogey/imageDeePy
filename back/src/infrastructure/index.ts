import "reflect-metadata"
// Enable env config
import 'dotenv/config';

// Inject dependencies
import '../infrastructure/core/container';

// Start API
import './core/index';
