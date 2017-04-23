"use strict";

function SpriteSheetTextureEditor(parent, closeable, container, index)
{
	TextureEditor.call(this, parent, closeable, container, index);

	var self = this;

	//Sheet format
	this.form.addText("Sheet format");
	this.frames = new CoordinatesBox(this.form.element);
	this.frames.setMode(CoordinatesBox.VECTOR2);
	this.frames.size.set(120, 18);
	this.frames.setValue(1, 1, 0);
	this.frames.setStep(1.0);
	this.frames.setOnChange(function()
	{
		if(self.texture !== null)
		{
			var value = self.frames.getValue();
			self.texture.framesHorizontal = value.x;
			self.texture.framesVertical = value.y;
		}
	});
	this.form.add(this.frames);
	this.form.nextRow();

	//Total frames
	this.form.addText("Frames");
	this.totalFrames = new NumberBox(this.form.element);
	this.totalFrames.size.set(60, 18);
	this.totalFrames.setStep(1.0);
	this.totalFrames.setRange(0, Number.MAX_SAFE_INTEGER);
	this.totalFrames.setOnChange(function()
	{
		if(self.texture !== null)
		{
			self.texture.totalFrames = self.totalFrames.getValue();
		}
	});
	this.form.add(this.totalFrames);
	this.form.nextRow();

	//Speed
	this.form.addText("Speed");
	this.animationSpeed = new NumberBox(this.form.element);
	this.animationSpeed.size.set(60, 18);
	this.animationSpeed.setStep(0.01);
	this.animationSpeed.setRange(0, Number.MAX_SAFE_INTEGER);
	this.animationSpeed.setOnChange(function()
	{
		if(self.texture !== null)
		{
			self.texture.animationSpeed = self.animationSpeed.getValue();
		}
	});
	this.form.add(this.animationSpeed);
	this.form.nextRow();
}

SpriteSheetTextureEditor.prototype = Object.create(TextureEditor.prototype);

SpriteSheetTextureEditor.prototype.attach = function(texture)
{
	TextureEditor.prototype.attach.call(this, texture);

	this.frames.setValue(this.texture.framesHorizontal, this.texture.framesVertical);
	this.totalFrames.setValue(this.texture.totalFrames);
	this.animationSpeed.setValue(this.texture.animationSpeed);
};
