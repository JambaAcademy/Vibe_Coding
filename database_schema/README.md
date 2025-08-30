# Multi-Vendor Marketplace Database Schema

This project provides a comprehensive SQL schema and ER diagram for a multi-vendor marketplace platform, similar to Etsy. It is designed to support individual sellers creating shops, listing products with variations, managing inventory, processing orders, handling reviews, favorites, and generating seller analytics.

## Features
- **User Management:** Buyers and sellers, with support for multiple shops per seller.
- **Shop Management:** Sellers can create and manage their own shops.
- **Product Listings:** Products can have multiple variations (size, color, etc.) and inventory tracking.
- **Order Processing:** Buyers can place orders containing multiple products/variations.
- **Reviews & Favorites:** Users can review and favorite products and shops.
- **Analytics:** Track shop performance metrics (sales, views, etc.).

## Files
- `Users table.sql`: SQL schema for the Users table.
- `Shops.sql`: SQL schema for Shops.
- `Products.sql`: SQL schema for Products.
- `ProductVariations.sql`: SQL schema for product variations.
- `Inventory.sql`: SQL schema for inventory management.
- `Orders.sql`: SQL schema for orders and order items.
- `Reviews.sql`: SQL schema for reviews.
- `Favorites.sql`: SQL schema for favorites.
- `Analytics.sql`: SQL schema for shop analytics.
- `ER_Diagram.png`: Entity Relationship diagram visualizing the schema.

## How to Use
1. **Review the SQL files:** Each file contains the `CREATE TABLE` statements for a specific entity.
2. **Set up your database:** Run the SQL scripts in your preferred SQL database (PostgreSQL/MySQL).
3. **Refer to the ER diagram:** Use `ER_Diagram.png` to understand the relationships between entities.
4. **Customize as needed:** Adjust fields, constraints, or relationships to fit your specific business requirements.

## Example Workflow
- A seller registers and creates a shop.
- The seller lists products with variations (e.g., size, color).
- Inventory is tracked per product variation.
- Buyers place orders, which are tracked in the Orders tables.
- Users can leave reviews and favorite products/shops.
- Analytics tables help sellers track their shop performance.

## Contributing
Feel free to fork this project and adapt the schema for your own marketplace needs. Pull requests are welcome for improvements or additional features.

## License
This project is open-source and free to use for educational and commercial purposes.

## Contact
For questions or support, please open an issue or contact the repository maintainer.
