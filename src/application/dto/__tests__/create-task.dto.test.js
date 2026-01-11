
const createTaskDTO = require('../create-task.dto');

describe('CreateTaskDTO', () => {
    // Step 1: Happy Path - Test that valid input produces expected output
    test('should create a valid task object when given correct data', () => {
        const input = {
            title: '  Learn Unit Testing  ', // Extra spaces to test trimming
            description: 'It is important',
            completed: false
        };

        const result = createTaskDTO(input);

        expect(result).toEqual({
            title: 'Learn Unit Testing',
            description: 'It is important',
            completed: false
        });
    });

    // Step 2: Error Path - Test that invalid input throws an error
    test('should throw an error if title is missing', () => {
        const input = { description: 'No title provided' };
        expect(() => createTaskDTO(input)).toThrow('Title is required');
    });


    // Step 3: Edge Case - Test default values (optional fields)
    test('should set default values for optional fields', () => {
        const input = {
            title: 'Simple Task'
        };

        const result = createTaskDTO(input);

        expect(result).toEqual({
            title: 'Simple Task',
            description: '', // Default empty string
            completed: false // Default false
        });
    });
// // Step 4: Security - Test for SQL Injection
    // test('should throw error if input contains SQL injection patterns', () => {
    //     const maliciousInputs = [
    //         'Task; DROP TABLE tasks',
    //         'Task -- comments',
    //         'Task OR 1=1'
    //     ];

    //     maliciousInputs.forEach(maliciousTitle => {
    //         const input = { title: maliciousTitle };
    //         expect(() => createTaskDTO(input)).toThrow('Invalid characters detected');
    //     });
    // });
    // test('should throw an error if title is too short (< 3 chars)', () => {
    //     const input = { title: 'Hi' };
    //     expect(() => createTaskDTO(input)).toThrow('Title must be at least 3 characters');
    // });

    // test('should throw an error if title is too long (> 100 chars)', () => {
    //     const longTitle = 'a'.repeat(101);
    //     const input = { title: longTitle };
    //     expect(() => createTaskDTO(input)).toThrow('Title cannot exceed 100 characters');
    // });

    // // Step 4: Security - Test for SQL Injection
    // test('should throw error if input contains SQL injection patterns', () => {
    //     const maliciousInputs = [
    //         'Task; DROP TABLE tasks',
    //         'Task -- comments',
    //         'Task OR 1=1'
    //     ];

    //     maliciousInputs.forEach(maliciousTitle => {
    //         const input = { title: maliciousTitle };
    //         expect(() => createTaskDTO(input)).toThrow('Invalid characters detected');
    //     });
    // });
});
