//------------------------------------------------------------------------------
// file:	AudioSource.cpp
// author:	K Preston
// email:	k.preston@digipen.edu
//
// brief:	FMOD wrapper with settings management, randomization, spatialization
// Course:  GAM200F22-B
// 
// Copyright © 2022 DigiPen, All rights reserved.
//------------------------------------------------------------------------------

#include "AudioSource.h"
#include <algorithm>
#include "GameObject.h"
#include "Transform.h"
#include "SoundGroup.h"

#include <rapidjson/filereadstream.h>
#include <rapidjson/document.h>
#include <cstdio>
#include <rapidjson/istreamwrapper.h>

#define AUDIOSOURCE_FILE_BUFFER_SIZE 2048

// CONSTRUCTORS / DESTRUCTOR: //

/******************************************************************************
	Function: AudioSource

	Description: Default constructor

******************************************************************************/
AudioSource::AudioSource()
	: Component(TypeEnum::cAudioSource)
	, audioSystem(0)
	, sounds()
	, settings()
	, group()
	, parent()
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	audioSystem = getAudioSystem();
	group.CreateFMODGroup(audioSystem->GetFMODSystem());
	settings.group = &group;
	setParent(SOUND_GROUP_DEFAULT);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		system (AudioSystemPtr) - Pointer to the AudioSystem

******************************************************************************/
AudioSource::AudioSource(AudioSystemPtr system)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(system)
	, sounds()
	, settings()
	, group()
	, parent()
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	audioSystem = system;
	group.CreateFMODGroup(system->GetFMODSystem());
	settings.group = &group;
	setParent(SOUND_GROUP_DEFAULT);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		system (AudioSystemPtr) - Pointer to the AudioSystem
		path (const std::string*) - Filepath from which to create a Sound object

******************************************************************************/
AudioSource::AudioSource(AudioSystemPtr system, const std::string* path)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(system)
	, sounds()
	, settings()
	, group()
	, parent()
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	group.CreateFMODGroup(system->GetFMODSystem());
	settings.group = &group;
	setParent(SOUND_GROUP_DEFAULT);

	// This must come after group setting so if PlayOnLoad is enabled, the Sound plays in the right group.
	loadSound(path);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		system (AudioSystemPtr) - Pointer to the AudioSystem
		path (const std::string*) - Filepath from which to create a Sound object
		stream (bool) - Indicates if the created Sound should stream from storage

******************************************************************************/
AudioSource::AudioSource(AudioSystemPtr system, const std::string* path, bool stream)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(system)
	, sounds()
	, settings()
	, group()
	, parent()
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	group.CreateFMODGroup(system->GetFMODSystem());
	settings.group = &group;
	setParent(SOUND_GROUP_DEFAULT);

	// This must come after group setting so if PlayOnLoad is enabled, the Sound plays in the right group.
	loadSound(path, stream);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		parentGroup (SoundGroup*) - Parent to this AudioSource's SoundGroup

******************************************************************************/
AudioSource::AudioSource(SoundGroup* parentGroup)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(0)
	, sounds()
	, settings()
	, group()
	, parent(parentGroup)
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	audioSystem = getAudioSystem();
	group.CreateFMODGroup(audioSystem->GetFMODSystem());
	settings.group = &group;
	setParent(parentGroup);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		system (AudioSystemPtr) - Pointer to the AudioSystem
		parentGroup (SoundGroup*) - Parent to this AudioSource's SoundGroup

******************************************************************************/
AudioSource::AudioSource(AudioSystemPtr system, SoundGroup* parentGroup)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(system)
	, sounds()
	, settings()
	, group()
	, parent()
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	group.CreateFMODGroup(system->GetFMODSystem());
	settings.group = &group;
	setParent(parentGroup);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		system (AudioSystemPtr) - Pointer to the AudioSystem
		parentGroup (SoundGroup*) - Parent to this AudioSource's SoundGroup
		path (const std::string*) - Filepath from which to create a Sound object

******************************************************************************/
AudioSource::AudioSource(AudioSystemPtr system, SoundGroup* parentGroup, const std::string* path)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(system)
	, sounds()
	, settings()
	, group()
	, parent()
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	group.CreateFMODGroup(system->GetFMODSystem());
	settings.group = &group;
	setParent(parentGroup);

	// This must come after group setting so if PlayOnLoad is enabled, the Sound plays in the right group.
	loadSound(path);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		system (AudioSystemPtr) - Pointer to the AudioSystem
		parentGroup (SoundGroup*) - Parent to this AudioSource's SoundGroup
		path (const std::string*) - Filepath from which to create a Sound object
		stream (bool) - Indicates if the created Sound should stream from storage

******************************************************************************/
AudioSource::AudioSource(AudioSystemPtr system, SoundGroup* parentGroup, const std::string* path, bool stream)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(system)
	, sounds()
	, settings()
	, group()
	, parent(parentGroup)
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	group.CreateFMODGroup(system->GetFMODSystem());
	settings.group = &group;
	setParent(parentGroup);

	// This must come after group setting so if PlayOnLoad is enabled, the Sound plays in the right group.
	loadSound(path, stream);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		parentGroup (SOUND_GROUP) - Parent to this AudioSource's SoundGroup

******************************************************************************/
AudioSource::AudioSource(SOUND_GROUP parentGroup)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(0)
	, sounds()
	, settings()
	, group()
	, parent()
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	audioSystem = getAudioSystem();
	group.CreateFMODGroup(audioSystem->GetFMODSystem());
	settings.group = &group;
	setParent(parentGroup);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		system (AudioSystemPtr) - Pointer to the AudioSystem
		parentGroup (SOUND_GROUP) - Parent to this AudioSource's SoundGroup

******************************************************************************/
AudioSource::AudioSource(AudioSystemPtr system, SOUND_GROUP parentGroup)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(system)
	, sounds()
	, settings()
	, group()
	, parent()
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	group.CreateFMODGroup(system->GetFMODSystem());
	system->Group(parentGroup)->AddSubGroup(&group);
	settings.group = &group;
	setParent(parentGroup);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		system (AudioSystemPtr) - Pointer to the AudioSystem
		parentGroup (SOUND_GROUP) - Parent to this AudioSource's SoundGroup
		path (const std::string*) - Filepath from which to create a Sound object

******************************************************************************/
AudioSource::AudioSource(AudioSystemPtr system, SOUND_GROUP parentGroup, const std::string* path)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(system)
	, sounds()
	, settings()
	, group()
	, parent(system->Group(parentGroup))
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	group.CreateFMODGroup(system->GetFMODSystem());
	settings.group = &group;
	setParent(parentGroup);

	// This must come after group setting so if PlayOnLoad is enabled, the Sound plays in the right group.
	loadSound(path);
}

/******************************************************************************
	Function: AudioSource

	Description: Constructor

	Parameters:
		system (AudioSystemPtr) - Pointer to the AudioSystem
		parentGroup (SOUND_GROUP) - Parent to this AudioSource's SoundGroup
		path (const std::string*) - Filepath from which to create a Sound object
		stream (bool) - Indicates if the created Sound should stream from storage

******************************************************************************/
AudioSource::AudioSource(AudioSystemPtr system, SOUND_GROUP parentGroup, const std::string* path, bool stream)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(system)
	, sounds()
	, settings()
	, group()
	, parent(system->Group(parentGroup))
	, faderDSP(0)
	, playOnLoad(false)
	, positional(false)
	, listener(0)
	, listenerName()
	, panScale(1.0f)
	, distanceScale(1.0f)
	, dopplerScale(1.6f)
	, defaultVolume(0)
	, lastDistance(0)
	, defaultFreq(0)
	, pitchDSP(0)
	, destroyFlag(false)
{
	group.CreateFMODGroup(system->GetFMODSystem());
	settings.group = &group;
	setParent(parentGroup);

	// This must come after group setting so if PlayOnLoad is enabled, the Sound plays in the right group.
	loadSound(path, stream);
}

/******************************************************************************
	Function: AudioSource

	Description: Copy constructor

	Parameters:
		other (const AudioSource&) - AudioSource from which to copy data

******************************************************************************/
AudioSource::AudioSource(const AudioSource& other)
	: Component(TypeEnum::cAudioSource)
	, audioSystem(other.audioSystem)
	, sounds()
	, settings(other.settings)
	, group()
	, parent(other.parent)
	, faderDSP(0)
	, playOnLoad(other.playOnLoad)
	, positional(other.positional)
	, listener(0)
	, listenerName(other.listenerName)
	, panScale(other.panScale)
	, distanceScale(other.distanceScale)
	, dopplerScale(other.dopplerScale)
	, defaultVolume(other.defaultVolume)
	, lastDistance(0)
	, defaultFreq(other.defaultFreq)
	, pitchDSP(0)
	, destroyFlag(false)
{
	settings.group = &group;

	// Note that this has to be through the setParent function because it's more than just setting a value.
	if (other.parent)
	{
		setParent(other.parent);
	}

	// This must come after group setting so if PlayOnLoad is enabled, the Sound plays in the right group.
	for (Sound* sound : other.sounds)
	{
		if (sound)
		{
			loadSound(sound->GetName(), sound->stream());
		}
	}

	volume(other.getVolume());
}

/******************************************************************************
	Function: ~AudioSource

	Description: Free all contained Sounds and SoundGroup

******************************************************************************/
AudioSource::~AudioSource()
{
	freeSounds();

	if (pitchDSP)
	{
		group.getFMODGroup()->removeDSP(pitchDSP);
		pitchDSP->release();
	}

	if(faderDSP)
	{
		group.getFMODGroup()->removeDSP(faderDSP);
		faderDSP->release();
	}
}

/******************************************************************************
	Function: Clone

	Description: Create a clone of this AudioSource.

	Return:
		AudioSource* - Clone of this AudioSource

******************************************************************************/
AudioSource* AudioSource::Clone() const
{
	return DBG_NEW AudioSource(*this);
}

/******************************************************************************
	Function: Read

	Description: Read AudioSource data from a JSON file.

	Parameters:
		path (const std::string) - Executable-relative filepath to the JSON file
								   from which to load data.

******************************************************************************/
void AudioSource::Read(const std::string* path)
{
	if (!checkJSON(path))
	{
		Trace::GetTrace().Message("AudioSource | ERROR | Read | Failed to read AudioSource ", path, ". Expected filetype .json.", "\n");
		return;
	}

	std::ifstream fp (*path, std::ifstream::in);

	if (!fp)
	{
		Trace::GetTrace().Message("AudioSource | ERROR | Read | Failed to read AudioSource ", path, ". Failed to open file.", "\n");
		return;
	}

	// Open Stream.
	rapidjson::IStreamWrapper stream(fp);

	// Create and parse Document.
	rapidjson::Document doc;
	doc.ParseStream(stream);

	// Read with the doc read function.
	Read(&doc);

	// Close the Document.
	fp.close();
}

/******************************************************************************
	Function: Read

	Description: Read AudioSource data from a JSON document.

	Parameters:
		document (rapidjson::Document*) - JSON document from which to load data.

******************************************************************************/
void AudioSource::Read(rapidjson::Document* doc)
{
	if(doc->HasMember("AudioSource"))
	{
		// It better be a string or an object or I'm going to throw a fit.
		assert((*doc)["AudioSource"].IsString() || (*doc)["AudioSource"].IsObject());

		// If the AudioSource member has a filepath, load from that path.
		if ((*doc)["AudioSource"].IsString())
		{
			std::string path = (*doc)["AudioSource"].GetString();
			Read(&path);
			return;
		}
		// If the AudioSource member contains the object itself, read that data.
		else if ((*doc)["AudioSource"].IsObject())
		{
			bool stream = false;
			// Get AudioSource attributes.
			if ((*doc)["AudioSource"].HasMember("Positional"))
				positional = (*doc)["AudioSource"]["Positional"].GetBool();
			if ((*doc)["AudioSource"].HasMember("Pan Scale"))
				panScale = (*doc)["AudioSource"]["Pan Scale"].GetFloat();
			if ((*doc)["AudioSource"].HasMember("Doppler Scale"))
				dopplerScale = (*doc)["AudioSource"]["Doppler Scale"].GetFloat();
			if ((*doc)["AudioSource"].HasMember("Distance Scale"))
				distanceScale = (*doc)["AudioSource"]["Distance Scale"].GetFloat();
			if ((*doc)["AudioSource"].HasMember("Loop Count"))
				loopCount((*doc)["AudioSource"]["Loop Count"].GetInt());
			if ((*doc)["AudioSource"].HasMember("Volume"))
				defaultVolume = (*doc)["AudioSource"]["Volume"].GetFloat();
			if ((*doc)["AudioSource"].HasMember("Frequency"))
				freqMult((*doc)["AudioSource"]["Frequency"].GetFloat());
			if ((*doc)["AudioSource"].HasMember("Pan"))
				pan((*doc)["AudioSource"]["Pan"].GetFloat());
			if ((*doc)["AudioSource"].HasMember("Play on Load"))
				playOnLoad = (*doc)["AudioSource"]["Play on Load"].GetBool();
			if ((*doc)["AudioSource"].HasMember("Listener"))
				listenerName = (*doc)["AudioSource"]["Listener"].GetString();
			if ((*doc)["AudioSource"].HasMember("Stream"))
				stream = (*doc)["AudioSource"]["Stream"].GetBool();

			if ((*doc)["AudioSource"].HasMember("Group"))
			{
				std::string group = (*doc)["AudioSource"]["Group"].GetString();
				if (group.find("music") != std::string::npos)
				{
					setParent(SOUND_GROUP_MUSIC);
					settings.systemGroup = SOUND_GROUP_MUSIC;
				}
				else if (group.find("fx") != std::string::npos)
				{
					setParent(SOUND_GROUP_FX);
					settings.systemGroup = SOUND_GROUP_FX;
				}
				else if (group.find("ui") != std::string::npos)
				{
					setParent(SOUND_GROUP_UI);
					settings.systemGroup = SOUND_GROUP_UI;
				}
			}

			// Check if the Document contains a Sound path.
			if ((*doc)["AudioSource"].HasMember("Sound"))
			{
				std::string path = (*doc)["AudioSource"]["Sound"].GetString();
				loadSound(&path, stream);
			}

			// Check if the Document contains an array of Sound paths.
			if ((*doc)["AudioSource"].HasMember("Sounds"))
			{
				const rapidjson::Value& soundPaths = (*doc)["AudioSource"]["Sounds"];
				assert(soundPaths.IsArray());

				// For each voice MusicSource...
				for (rapidjson::Value::ConstValueIterator i = soundPaths.Begin(); i != soundPaths.End(); ++i)
				{
					std::string path = i->GetString();
					loadSound(&path, stream);
				}
			}
		}
	}
	else
	{
		bool stream = false;
		// Get AudioSource attributes.
		if ((*doc).HasMember("Positional"))
			positional = (*doc)["Positional"].GetBool();
		if ((*doc).HasMember("Pan Scale"))
			panScale = (*doc)["Pan Scale"].GetFloat();
		if ((*doc).HasMember("Doppler Scale"))
			dopplerScale = (*doc)["Doppler Scale"].GetFloat();
		if ((*doc).HasMember("Distance Scale"))
			distanceScale = (*doc)["Distance Scale"].GetFloat();
		if ((*doc).HasMember("Pan Scale"))
			panScale = (*doc)["Pan Scale"].GetFloat();
		if ((*doc).HasMember("Loop Count"))
			loopCount((*doc)["Loop Count"].GetInt());
		if ((*doc).HasMember("Volume"))
			defaultVolume = (*doc)["Volume"].GetFloat();
		if ((*doc).HasMember("Frequency"))
			freqMult((*doc)["Frequency"].GetFloat());
		if ((*doc).HasMember("Pan"))
			pan((*doc)["Pan"].GetFloat());
		if ((*doc).HasMember("Play on Load"))
			playOnLoad = (*doc)["Play on Load"].GetBool();
		if ((*doc).HasMember("Listener"))
			listenerName = (*doc)["Listener"].GetString();
		if ((*doc).HasMember("Stream"))
			stream = (*doc)["AudioSource"]["Stream"].GetBool();

		if ((*doc).HasMember("Group"))
		{
			std::string group = (*doc)["Group"].GetString();
			if (group.find("music") != std::string::npos)
			{
				setParent(SOUND_GROUP_MUSIC);
			}
			else if (group.find("fx") != std::string::npos)
			{
				setParent(SOUND_GROUP_FX);
			}
			else if (group.find("ui") != std::string::npos)
			{
				setParent(SOUND_GROUP_UI);
			}
		}

		// Check if the Document contains a Sound path.
		if ((*doc).HasMember("Sound"))
		{
			std::string path = (*doc)["Sound"].GetString();
			loadSound(&path, stream);
		}

		// Check if the Document contains an array of Sound paths.
		if ((*doc).HasMember("Sounds"))
		{
			const rapidjson::Value& soundPaths = (*doc)["Sounds"];
			assert(soundPaths.IsArray());

			// For each voice MusicSource...
			for (rapidjson::Value::ConstValueIterator i = soundPaths.Begin(); i != soundPaths.End(); ++i)
			{
				std::string path = i->GetString();
				loadSound(&path, stream);
			}
		}
	}
}

/******************************************************************************
	Function: Update

	Description: Update positional pan if enabled.

	Parameters:
		dt (float) - Time since last Update (seconds)

******************************************************************************/
void AudioSource::Update(float dt)
{
	// Update SoundGroup.
	group.Update(dt);

	if(positional)
	{
		calculatePan();
	}

	// If this AudioSource was set to play on load...
	if (playOnLoad)
	{
		// Play (default).
		Play();
		// Clear PlayOnLoad flag so this only happens once.
		playOnLoad = false;
	}
}

/******************************************************************************
	Function: Initialize

	Description: Initialize SoundGroup, find listener if positional panning
				 enabled, store default volume.

******************************************************************************/
void AudioSource::Initialize()
{
	group.Initialize();

	if(!faderDSP)
	{
		getAudioSystem()->GetFMODSystem()->createDSPByType(FMOD_DSP_TYPE_FADER, &faderDSP);
		faderDSP->setActive(true);
		faderDSP->setBypass(false);
		group.getFMODGroup()->addDSP(FMOD_CHANNELCONTROL_DSP_HEAD, faderDSP);
	}
	volume(0.8f);

	// If positional enabled and no listener has been set but a listener name exists, 
	// Find the listener specified in listenerName.
	if(positional && !listener && !listenerName.empty())
	{
		listener = mParent->GetFromList(listenerName);
	}

	// Save some default playback settings that may be modified later.
	group.Volume(defaultVolume);

	defaultFreq = settings.freqMult;

	if (positional && !pitchDSP)
	{
		AudioSystem* system = getAudioSystem();
		system->GetFMODSystem()->createDSPByType(FMOD_DSP_TYPE_PITCHSHIFT, &pitchDSP);
		pitchDSP->setActive(true);
		pitchDSP->setBypass(false);
		group.getFMODGroup()->addDSP(FMOD_CHANNELCONTROL_DSP_HEAD, pitchDSP);
	}
}

// PLAYBACK: //

/******************************************************************************
	Function: Play

	Description: Play the first Sound in this AudioSource

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::Play()
{
	// If no Sounds are loaded, return error.
	if ((int)sounds.size() == 0)
	{
		return SOUND_ERROR_UNINIT_SOUND;
	}
	// If a Sound exists at position 0, play that Sound.
	if(sounds[0])
	{
		return sounds[0]->Play(&settings);
	}
	// If no Sound exists at position 0, do nothing.
	return SOUND_ERROR_NO_ACTION;
}

/******************************************************************************
	Function: Play

	Description: Play the given Sound in this AudioSource by index

	Parameters:
		sound (int) - Index of the Sound to play
					  (accessible via AudioSource::getSoundIndex)

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::Play(int sound)
{
	// If the given index is outside of the sounds vector, return error.
	if ((int)sounds.size() <= sound || sound < 0)
	{
		return SOUND_ERROR_INVALID_SOUND;
	}
	// If a Sound exists at the given index, play that Sound.
	if (sounds[sound])
	{
		return sounds[sound]->Play(&settings);
	}
	// If no Sound exists at the given index, do nothing.
	return SOUND_ERROR_NO_ACTION;
}

/******************************************************************************
	Function: Play

	Description: Play the given Sound in this AudioSource by string name.
				 Note: this is inefficient. Prefer AudioSource::Play(int sound).

	Parameters:
		name (const std::string) - Name of the Sound to play. Can be any substring
								   of the Sound's name.

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::Play(const std::string name)
{
	// For each Sound...
	for (Sound* sound : sounds)
	{
		// If that Sound's name contains the parameter name...
		if (sound->GetName()->find(name) != std::string::npos)
		{
			// ... play that Sound.
			return sound->Play(&settings);
		}
	}

	return SOUND_ERROR_INVALID_SOUND;
}

/******************************************************************************
	Function: PlayRandom

	Description: Play the first Sound in this AudioSource with the given
				 randomization of frequency, volume. Selects a random SubSound if
				 the Sound contains SubSounds.

	Parameters:
		randomness (float) - Randomization factor  (0-1). This affects frequency
							 and volume, not soundbank selection.

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::PlayRandom(float randomness)
{
	// If no Sounds are loaded, return error.
	if ((int)sounds.size() == 0)
	{
		return SOUND_ERROR_UNINIT_SOUND;
	}
	// If a Sound exists at position 0, play that Sound.
	if (sounds[0])
	{
		return sounds[0]->Play(settings, randomness);
	}
	// If no Sound exists at position 0, do nothing.
	return SOUND_ERROR_NO_ACTION;
}

/******************************************************************************
	Function: PlayRandom

	Description: Play the given Sound in this AudioSource by index with the given
				 randomization of frequency, volume. Selects a random SubSound if
				 the Sound contains SubSounds.

	Parameters:
		sound (int) - Index of the Sound to play
					  (accessible via AudioSource::getSoundIndex)
		randomness (float) - Randomization factor  (0-1). This affects frequency
							 and volume, not soundbank selection.

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::PlayRandom(int sound, float randomness)
{
	// If the given index is outside of the sounds vector, return error.
	if ((int)sounds.size() <= sound || sound < 0)
	{
		return SOUND_ERROR_INVALID_SOUND;
	}
	// If a Sound exists at the given index, play that Sound.
	if(sounds[sound])
	{
		return sounds[sound]->Play(settings, randomness);
	}

	// If no Sound exists at the given index, do nothing.
	return SOUND_ERROR_NO_ACTION;
}

/******************************************************************************
	Function: PlayRandom

	Description: Play the given Sound in this AudioSource by name with the given
				 randomization of frequency, volume. Selects a random SubSound if
				 the Sound contains SubSounds.
				 Note: this is inefficient.
				 Prefer AudioSource::PlayRandom(int sound...).

	Parameters:
		name (const std::string) - Name of the Sound to play. Can be any substring
								   of the Sound's name.
		randomness (float) - Randomization factor  (0-1). This affects frequency
							 and volume, not soundbank selection.

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::PlayRandom(const std::string name, float randomness)
{
	// For each Sound...
	for (Sound* sound : sounds)
	{
		// If that Sound's name contains the parameter name...
		if (sound->GetName()->find(name) != std::string::npos)
		{
			// ... play that Sound.
			return sound->Play(settings, randomness);
		}
	}

	return SOUND_ERROR_INVALID_SOUND;
}

/******************************************************************************
	Function: Stop

	Description: Stop playback of all Sounds in this AudioSource. Sounds are
				 unpaused and available for playback.

******************************************************************************/
int AudioSource::Stop()
{
	return group.Stop();
}

// Settings

/******************************************************************************
	Function: loopCount

	Description: Set the number of times to loop playback. SOUND_LOOP_INFINITE (-1)
				 for infinite looping and SOUND_LOOP_NONE (0) for none.

	Parameters:
		count (int) - Number of times to loop playback

******************************************************************************/
void AudioSource::loopCount(int count)
{
	settings.loopCount = count;
}

/******************************************************************************
	Function: volume

	Description: Set the Volume of playback (0.0 - 1.0).
				 Values > 1 are clamped, values <= 0 are ignored.

	Parameters:
		volume (float) - Volume of playback (0.0 - 1.0)

******************************************************************************/
void AudioSource::volume(float volume)
{
	float newVolume = -80;
	if (volume > 1)
	{
		volume = 1;
	}
	else if (volume < 0)
	{
		volume = 0;
		newVolume = -80;
	}
	if(volume > 0)
	{
		newVolume = 20 * logf(volume) + 10;
		if (newVolume < -80)
		{
			newVolume = -80;
		}
	}
	faderDSP->setParameterFloat(FMOD_DSP_FADER_GAIN, newVolume);
}

/******************************************************************************
	Function: freqMult

	Description: Set the frequency multiplier of playback.
				 1.0 = normal, 2.0 = double speed/pitch.

	Parameters:
		frequency (float) - Frequency multiplier of playback

******************************************************************************/
void AudioSource::freqMult(float frequency)
{
	settings.freqMult = frequency;
}

/******************************************************************************
	Function: pan

	Description: Set the pan (left/right balance) at which to play Sounds.
				 -1 = left, 0 = middle, 1 = right

	Parameters:
		pan (float) - Pan (left/right balance) at which to play Sounds

******************************************************************************/
void AudioSource::pan(float pan)
{
	settings.pan = pan;
}


/******************************************************************************
	Function: getSoundIndex

	Description: Get a given Sound's array index for use in Play(int sound).

	Parameters:
		name (const std::string) - Name of the Sound to look up. Can be any
								   substring of the Sound's name.

	Return:
		int - The given Sound's array index

******************************************************************************/
int AudioSource::getSoundIndex(const std::string name)
{
	// For each Sound...
	for (int i = 0; i < sounds.size(); ++i)
	{
		// If that Sound's name contains the parameter name...
		if (sounds[i]->GetName()->find(name) != std::string::npos)
		{
			// Return that Sound's index.
			return i;
		}
	}

	return 0;
}

/******************************************************************************
	Function: setSystem

	Description: Set the AudioSystem pointer.

	Parameters:
		system (AudioSystemPtr) - Pointer to the AudioSystem

******************************************************************************/
void AudioSource::setSystem(AudioSystemPtr system)
{
	audioSystem = system;
}

/******************************************************************************
	Function: freeSounds

	Description: Free all Sounds in this AudioSource.

******************************************************************************/
void AudioSource::freeSounds()
{
	// Delete all Sound objects.
	for (Sound* sound : sounds)
	{
		if(sound)
		{
			delete sound;
		}
	}

	sounds.clear();
}

/******************************************************************************
	Function: loadSound

	Description: Load a Sound from the given filepath.

	Parameters:
		path (const std::string*) - Filepath from which to create a Sound object

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::loadSound(const std::string* path)
{
	Sound* newSound = DBG_NEW Sound(path, audioSystem);

	if (!newSound)
	{
		return SOUND_ERROR_INVALID_FILEPATH;
	}

	sounds.push_back(newSound);

	return SOUND_ERROR_SUCCESS;

	//if (playOnLoad)
	//	sounds.back()->Play(&settings);
}

/******************************************************************************
Function: getVolume

Description: Get the Volume of playback (0.0 - 1.0).
			 Values > 1 are clamped, values <= 0 are ignored.

Return:
	float - Volume of playback (0.0 - 1.0)

******************************************************************************/
float AudioSource::getVolume() const
{ 
	float volume; 
	faderDSP->getParameterFloat(FMOD_DSP_FADER_GAIN, &volume, 0, 0); 
	return powf(10, (volume - 10) / 20.0f);
}

/******************************************************************************
	Function: loadSound

	Description: Load a Sound from the given filepath.

	Parameters:
		path (const std::string*) - Filepath from which to create a Sound object
		stream (bool) - Indicates if the created Sound should stream from storage

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::loadSound(const std::string* path, bool stream)
{
	Sound* newSound = DBG_NEW Sound(path, stream, audioSystem);

	if (!newSound)
	{
		return SOUND_ERROR_INVALID_FILEPATH;
	}

	sounds.push_back(newSound);

	return SOUND_ERROR_SUCCESS;

	//if (playOnLoad)
	//	sounds.back()->Play(&settings);
}

/******************************************************************************
	Function: setParent

	Description: Set the SoundGroup parent for this AudioSource.

	Parameters:
		newParent (SoundGroup*) - Parent to this AudioSource's SoundGroup

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::setParent(SoundGroup* newParent)
{ 
	parent = newParent; 
	return parent->AddSubGroup(&group);
}

/******************************************************************************
	Function: setParent

	Description: Set the SoundGroup parent for this AudioSource.

	Parameters:
		newParent (SOUND_GROUP) - Parent to this AudioSource's SoundGroup

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::setParent(SOUND_GROUP newParent)
{ 
	parent = audioSystem->Group(newParent);
	return parent->AddSubGroup(&group);
}

/******************************************************************************
	Function: calculatePan

	Description: Update SoundGroup pan and volume based on parent and listener
				 GameObject relative translations.

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::calculatePan()
{
	if (!positional)
	{
		return SOUND_ERROR_NO_ACTION;
	}
	if (!listener)
	{
		return SOUND_ERROR_NO_ACTION;
	}
	if (!mParent || !mParent->GetComponent<Transform>(TypeEnum::cTransform))
	{
		return SOUND_ERROR_NO_ACTION;
	}
	
	// Get source and listener positions.
	TransformPtr parentTransform = static_cast<TransformPtr>(mParent->GetComponent<Transform>(TypeEnum::cTransform));
	const glm::vec3* pTranslation = parentTransform->GetTranslation();
	TransformPtr listenerTransform = static_cast<TransformPtr>(listener->GetComponent<Transform>(TypeEnum::cTransform));
	const glm::vec3* lTranslation = listenerTransform->GetTranslation();
	
	float width = 1280.0f;

	// Calculate pan proportional to panScale and screen width.
	float pan = (pTranslation->x - lTranslation->x) * distanceScale / (panScale * width);

	// If the source and listener are within 2 screen widths of each other horizontally...
	if (abs(pan) < 2.0f)
	{
		// Set volume from distance to listener.
		float distance = glm::distance(*pTranslation, *lTranslation) * distanceScale;
		float newVolume = (std::powf(-distance + width, 3) / (2 * std::powf(width, 3)) + 0.5f);
		// Scale and shift 0-1 volume to -80-0
		volume(newVolume);

		// Offset frequency for doppler effect.
		if(lastDistance)
		{
			if (pitchDSP)
			{
				pitchDSP->setParameterFloat(FMOD_DSP_PITCHSHIFT_PITCH, defaultFreq - (distance - lastDistance) / (2 * width) * dopplerScale);
			}
		}

		// Save distance as lastDistance for reference next frame.
		lastDistance = distance;
	}
	// If the source and listener are more than 2 screen widths apart horizontally...
	else
	{
		// Set volume to 0.
		volume(0);
	}

	// Clamp pan.
	pan = std::min(std::max(pan, -1.0f), 1.0f);

	// Apply pan.
	group.Pan(pan);

	return SOUND_ERROR_SUCCESS;
}

/******************************************************************************
	Function: checkJSON

	Description: Check that the given path points to a JSON file.

	Parameters:
		path (const std::string*) - Path to check

	Return:
		bool - If the given path points to a JSON file

******************************************************************************/
bool AudioSource::checkJSON(const std::string* path)
{
	return path->substr(path->length() - 5, 5) == ".json";
}

/******************************************************************************
	Function: isPlaying

	Description: Get whether the AudioSource has any currently playing Sounds.

	Return:
		bool - Whether this AudioSource has any currently playing Sounds

******************************************************************************/
bool AudioSource::isPlaying()
{
	bool playing = false;
	FMOD_RESULT result = group.getFMODGroup()->isPlaying(&playing);
	return playing;
}

/******************************************************************************
	Function: setDelay

	Description: Set a playback delay for Sounds in this AudioSource (in seconds).

	Parameters:
		seconds (float) - Playback delay for Sounds in this AudioSource

	Return:
		int - SOUND_ERROR

******************************************************************************/
int AudioSource::setDelay(float seconds)
{
	unsigned long long dspClock = 0;
	group.getFMODGroup()->getDSPClock(&dspClock, 0);
	unsigned long long samples = (unsigned long long)(seconds * 48000);
	return group.getFMODGroup()->setDelay(dspClock + samples, 0, false);
}