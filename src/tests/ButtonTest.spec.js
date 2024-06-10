// ButtonTest.spec.js
//測試登入按鈕跟註冊按鈕
import shallowMount from '@vue/test-utils';
// const { shallowMount } = require('@vue/test-utils');
import ButtonGroup from '@/components/topBar.vue'; // 假設您的組件在 components 目錄下，並命名為 ButtonGroup.vue

describe('ButtonGroup.vue', () => {
  it('renders both login and register buttons', () => {
    const wrapper = shallowMount(ButtonGroup); // 創建渲染組件的包裝器

    // 找到所有的按鈕元素
    const loginButton = wrapper.find('button[data-testid="login-button"]');
    const registerButton = wrapper.find('button[data-testid="register-button"]');

    // 確認按鈕是否存在並且具有正確的屬性和事件
    expect(loginButton.exists()).toBe(true);
    expect(loginButton.text()).toContain('登入');
    expect(loginButton.attributes('color')).toBe('rgba(70, 105,147, 1)');
    expect(loginButton.attributes('prepend-icon')).toBe('mdi-account-circle');

    expect(registerButton.exists()).toBe(true);
    expect(registerButton.text()).toContain('註冊');
    expect(registerButton.attributes('color')).toBe('rgba(70, 105,147, 1)');
    expect(registerButton.attributes('prepend-icon')).toBe('mdi-account-plus-outline');

    // 模擬點擊事件並確認是否觸發了正確的方法
    loginButton.trigger('click');
    expect(wrapper.vm.sendLogin).toHaveBeenCalled();

    registerButton.trigger('click');
    expect(wrapper.vm.sendRegister).toHaveBeenCalled();
  });
});
