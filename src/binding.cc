#include <node.h>
#include <v8.h>

using namespace v8;

void InspectPromise(const FunctionCallbackInfo<Value> &args)
{
	if (!args[0]->IsPromise())
		return;

	auto isolate = args.GetIsolate();

	Local<Promise> promise = args[0].As<Promise>();

	int state = promise->State();

	Local<Value> values[2] = {Integer::New(isolate, state)};
	size_t number_of_values = 1;

	if (state != Promise::PromiseState::kPending)
		values[number_of_values++] = promise->Result();

	Local<Array> ret = Array::New(isolate, values, number_of_values);
	args.GetReturnValue().Set(ret);
}

void Init(Local<Object> exports)
{
	Local<Context> ctx = exports->GetCreationContext().ToLocalChecked();
	Isolate *isolate = ctx->GetIsolate();

	(void)exports->Set(
		ctx,
		String::NewFromUtf8(isolate, "inspectPromise").ToLocalChecked(),
		FunctionTemplate::New(isolate, InspectPromise)->GetFunction(ctx).ToLocalChecked());
}

NODE_MODULE(inspectPromise, Init);
