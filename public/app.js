document.addEventListener("DOMContentLoaded", handlers);

function handlers() {
  document.addEventListener("click", function (e) {
    switch (e.target.dataset.type) {
      case "remove":
        return removeHandler(e);
      case "edit":
        return editHandler(e);
      default:
        return;
    }
  });
}
function getClosestElement(e, selector) {
  return e.target.closest(selector);
}
const getContainer = e => getClosestElement(e, "li");

async function requestRemoveById(id) {
  return await fetch(`/${id}`, {
    method: "DELETE",
  });
}
async function removeHandler(event) {
  const container$ = getContainer(event);
  container$.remove();
  await requestRemoveById(event.target.dataset.id);
}

const debounce = timeouts => {
  return (id, ms, fn) => {
    clearTimeout(timeouts[id]);
    timeouts[id] = setTimeout(() => fn(), ms);
  };
};
const createRequestThread = (function () {
  const threads = {};
  const timeouts = {};
  return (id, createRequest) => {
    threads[id]?.controller.abort();
    const controller = new AbortController();
    threads[id] = {
      controller,
      request: debounce(timeouts)(id, 500, createRequest(controller.signal)),
    };
  };
})();

async function editHandler(event) {
  const id = event.target.dataset.id;
  const titleElement$ = await getContainer(event).querySelector(
    "[data-type=title]"
  );
  const oldTitle = titleElement$.textContent;
  const newTitle = prompt("Enter new title", oldTitle);
  titleElement$.textContent = newTitle;

  if (newTitle)
    createRequestThread(id, signal => async () => {
      const res = await fetch(`/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title: newTitle }),
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });
      if (!res.ok) {
        alert(
          `Something went wrong while updating note ${newTitle} (it will be renamed back to ${oldTitle}`
        );
        titleElement$.textContent = oldTitle;
      }
    });
}
