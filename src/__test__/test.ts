// Jest 설정 테스트용 간단한 테스트 코드

describe('Jest 설정 테스트', () => {
    test('기본 수학 연산이 올바르게 작동한다', () => {
        expect(2 + 2).toBe(4);
        expect(5 * 3).toBe(15);
        expect(10 - 4).toBe(6);
    });

    test('문자열 테스트가 올바르게 작동한다', () => {
        const greeting = 'Hello Jest!';
        expect(greeting).toBe('Hello Jest!');
        expect(greeting).toContain('Jest');
        expect(greeting.length).toBe(11);
    });

    test('배열 테스트가 올바르게 작동한다', () => {
        const fruits = ['apple', 'banana', 'orange'];
        expect(fruits).toHaveLength(3);
        expect(fruits).toContain('banana');
        expect(fruits[0]).toBe('apple');
    });

    test('객체 테스트가 올바르게 작동한다', () => {
        const user = {
            name: 'Test User',
            age: 25,
            isActive: true,
        };

        expect(user.name).toBe('Test User');
        expect(user.age).toBeGreaterThan(18);
        expect(user.isActive).toBeTruthy();
        expect(user).toHaveProperty('name');
    });

    test('비동기 테스트가 올바르게 작동한다', async () => {
        const promise = Promise.resolve('성공!');
        await expect(promise).resolves.toBe('성공!');
    });
});

// 유틸리티 함수 테스트
function add(a: number, b: number): number {
    return a + b;
}

function multiply(a: number, b: number): number {
    return a * b;
}

describe('유틸리티 함수 테스트', () => {
    test('add 함수가 올바르게 작동한다', () => {
        expect(add(1, 2)).toBe(3);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
    });

    test('multiply 함수가 올바르게 작동한다', () => {
        expect(multiply(2, 3)).toBe(6);
        expect(multiply(-2, 3)).toBe(-6);
        expect(multiply(0, 5)).toBe(0);
    });
});
