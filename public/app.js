import './assets/scss/main.scss';
import 'carbon-web-components/es/components/accordion/index.js';

/**
 * Injects a web chat instance into the page.
 */
function addWebChat() {
  // This is the standard web chat configuration object. You can modify these values with the embed code for your
  // own assistant if you wish to try this example with your assistant. You can find the documentation for this at
  // https://web-chat.global.assistant.watson.cloud.ibm.com/docs.html?to=api-configuration#configurationobject.
  const options = {
    integrationID: "376ef92e-04cc-450f-a044-15cf5f3de548", // The ID of this integration.
    region: "au-syd", // The region your integration is hosted in.
    serviceInstanceID: "72a56e5a-a6d3-4ca5-bddb-7ab1ea1d1183", // The ID of your service instance.
    onLoad: webChatOnLoad,
  };

  window.watsonAssistantChatOptions = options;

  const script = document.createElement('script');
  const version = options.clientVersion || 'latest';
  script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/${version}/WatsonAssistantChatEntry.js`;
  document.head.appendChild(script);
}

/**
 * This handler is called when we need to display an accordion in a custom response.
 */
function accordionHandler(event) {
  const { element } = event.data;

  // Just set the inner HTML of the custom element to the HTML expected by Carbon. The custom HTML elements as part
  // of the web components will cause Carbon to attach JavaScript behavior to the elements. This behavior is enabled
  // by the import from carbon-web-components at the top of this file.
  element.innerHTML = `
    <bx-accordion id="accordion">
      <bx-accordion-item title-text="The Everyday Card">
        $300 bonus plus 5% gas station cash back offer. Earn 2% cash back on all other purchases.
      </bx-accordion-item>
      <bx-accordion-item title-text="The Preferred Card">
        $300 bonus plus 5% gas station cash back offer. Earn 5% cash back on all other purchases.
      </bx-accordion-item>
      <bx-accordion-item title-text="The Topaz Card">
        $90 Annual fee. Earn 120,000 bonus points. Earn additional points on every purchase.
      </bx-accordion-item>
    </bx-accordion>
  `;

  // This code shows how to use custom event listeners on custom elements. Here we look up the accordion items we
  // added above and then add a listener for the "bx-accordion-item-toggled" event to each.
  const items = element.querySelectorAll('bx-accordion-item');
  items.forEach((item, index) => {
    item.addEventListener('bx-accordion-item-toggled', () => {
      console.log(`You toggled item ${index}`);
    });
  });
}

/**
 * This function is called when web chat has been loaded and is ready to be displayed.
 */
function webChatOnLoad(instance) {
  instance.on({
    type: 'customResponse',
    handler: (event, instance) => {
      // The "user_defined_type" property is just an example; it is not required. You can use any other property or
      // condition you want here. This makes it easier to handle different response types if you have more than
      // one custom response type.
      if (event.data.message.user_defined && event.data.message.user_defined.user_defined_type === 'accordion') {
        accordionHandler(event, instance);
      }
    },
  });
  instance.render();
}

// Launch web chat as soon as this script has loaded.
addWebChat();