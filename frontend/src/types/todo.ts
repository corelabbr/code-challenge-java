/**
 * Represents a Todo item.
 */
export interface Todo {
    /** 
     * Unique identifier for the Todo item. 
     * @type {string}
     */
    id: string;

    /** 
     * Title of the Todo item. 
     * @type {string}
     */
    title: string;

    /** 
     * Detailed content or description of the Todo item. 
     * @type {string}
     */
    content: string;

    /** 
     * Indicates if the Todo item is marked as a favorite. 
     * @type {boolean}
     */
    favorite: boolean;

    /** 
     * Color associated with the Todo item. 
     * @type {string}
     */
    color: string;
}

/**
 * Represents the response structure for getting multiple Todo items.
 */
export interface ApiResponseGet {
    /** 
     * Message indicating the status of the response. 
     * @type {string}
     */
    message: string;

    /** 
     * Array of Todo items returned from the API. 
     * @type {Todo[]}
     */
    data: Todo[];
}

/**
 * Represents the response structure for individual Todo operations.
 */
export interface ApiResponse {
    /** 
     * Message indicating the status of the response. 
     * @type {string}
     */
    message: string;

    /** 
     * Data of a single Todo item returned from the API. 
     * @type {Todo}
     */
    data: Todo;
}
